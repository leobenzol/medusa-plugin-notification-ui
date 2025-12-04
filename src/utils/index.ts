import { pretty, render } from "@react-email/components"
import { AdminNotificationTemplate } from "../types"

export const renderTemplate = async (
    templateCode: AdminNotificationTemplate["template_code"],
    layoutCode?: AdminNotificationTemplate["template_code"],
    shouldRenderWithLayout: boolean = true,
    selectedLocale: string = "en"
) => {
    // Helper function to extract React Email component names from JSX
    const extractReactEmailComponents = (jsx: string): string => {
        const componentPattern = /<([A-Z][a-zA-Z]*)/g
        const matches = jsx.matchAll(componentPattern)
        const components = new Set<string>()

        for (const match of matches) {
            components.add(match[1])
        }

        return Array.from(components).join(", ") || "Html, Head, Body"
    }

    // Reconstruct the full template code from the 4 sections
    const reconstructTemplate = ({ jsx, additional, preview_props, i18n }: AdminNotificationTemplate["template_code"]) => {
        return `
const React = require("react")
const { ${extractReactEmailComponents(jsx)} } = require("@react-email/components")
const i18next = require("i18next")

const Template = ({ ...props }) => {
${additional ? additional : "  // Additional code goes here"}

  return (
${jsx}
  )
}

Template.PreviewProps = {
${preview_props || ""}
}

${i18n || "// i18n keys: {}"}

module.exports = Template
`
    }

    const fullTemplateCode = reconstructTemplate(templateCode)

    // Dynamically import dependencies
    const [{ transform }, React, ReactEmailComponents, i18next] = await Promise.all([
        import("sucrase"),
        import("react"),
        import("@react-email/components"),
        import("i18next")
    ])

    // Transform TSX/JSX code to JavaScript
    const transformedCode = transform(fullTemplateCode, {
        transforms: ["typescript", "jsx"],
        production: true,
    }).code

    // Create a module scope with required dependencies
    const moduleScope: Record<string, any> = {
        React,
        react: React,
        "@react-email/components": ReactEmailComponents,
        i18next,
    }

    // Create a function from the transformed code
    const componentModule = new Function(
        "require",
        "exports",
        "module",
        `
      ${transformedCode}
      return module.exports.default || module.exports;
    `
    )

    // Execute with a custom require function
    const moduleExports = {}
    const moduleObj = { exports: moduleExports }

    const customRequire = (moduleName: string) => {
        if (moduleScope[moduleName]) {
            return moduleScope[moduleName]
        }
        throw new Error(`Module ${moduleName} not found`)
    }

    const Component = componentModule(customRequire, moduleExports, moduleObj)

    const props: any = {
        total: "test",
        locale: selectedLocale
    }

    let element = React.createElement(Component as React.ComponentType, { ...props, ...Component.PreviewProps })

    // If layout should be rendered and layout code exists, wrap the template in the layout
    if (shouldRenderWithLayout && layoutCode) {
        const fullLayoutCode = reconstructTemplate(layoutCode)

        const transformedLayoutCode = transform(fullLayoutCode, {
            transforms: ["typescript", "jsx"],
            production: true,
        }).code

        const layoutComponentModule = new Function(
            "require",
            "exports",
            "module",
            `
          ${transformedLayoutCode}
          return module.exports.default || module.exports;
        `
        )

        const layoutModuleExports = {}
        const layoutModuleObj = { exports: layoutModuleExports }

        const LayoutComponent = layoutComponentModule(customRequire, layoutModuleExports, layoutModuleObj)

        // Wrap the template element with the layout
        element = React.createElement(
            LayoutComponent as React.ComponentType,
            { ...LayoutComponent.PreviewProps },
            element
        )
    }

    let html = await render(element)
    // TODO: Workaround for some weird html(probably React 18 streaming SSR issue)
    // Find out why it is streaming and fix properly
    html = await render(element)
    const prettyHtml = await pretty(html)
    const text = await render(element, { plainText: true })

    return { html, prettyHtml, text }
}
