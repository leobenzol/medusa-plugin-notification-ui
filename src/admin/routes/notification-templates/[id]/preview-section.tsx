import { Container, Tooltip } from "@medusajs/ui"
import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { CodeView } from "../../../components/code-view"
import { IconButton, Select } from "@medusajs/ui"
import { Moon, Sun, SquaresPlus } from "@medusajs/icons"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AdminNotificationTemplate } from "../../../../types/http/notification-template"
import { renderTemplate } from "../../../../utils"
import { applyColorInversion, undoColorInversion } from "../../../utils"

type PreviewSectionProps = {
    templateCode: AdminNotificationTemplate["template_code"]
    layoutCode?: AdminNotificationTemplate["template_code"]
    hasLayout: boolean
}


export const PreviewSection = ({
    hasLayout,
    templateCode,
    layoutCode,
}: PreviewSectionProps) => {
    const { t } = useTranslation("notification-ui")
    const [activeView, setActiveView] = useState<ViewMode>("preview")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [renderWithLayout, setRenderWithLayout] = useState(hasLayout)
    const [locale, setLocale] = useState("en")
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const { data: renderOutput, isPending: isLoading, error } = useQuery({
        queryKey: [
            "template-preview",
            templateCode,
            ...(renderWithLayout && layoutCode ? [layoutCode] : []),
            renderWithLayout,
            locale
        ],
        queryFn: () => renderTemplate(
            templateCode,
            layoutCode,
            renderWithLayout,
            locale
        ),
        retry: false,
        enabled: !!templateCode.jsx && templateCode.jsx.trim().length > 0,
    })

    // Handle dark mode toggle
    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        if (isDarkMode) {
            applyColorInversion(iframe)
        } else {
            undoColorInversion(iframe)
        }
    }, [isDarkMode, renderOutput])

    const handleIframeLoad = () => {
        const iframe = iframeRef.current
        if (!iframe) return

        if (isDarkMode) {
            applyColorInversion(iframe)
        }
    }

    return (
        <Container className="divide-y p-0">
            <PreviewTopbar
                activeView={activeView}
                setActiveView={setActiveView}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                hasLayout={hasLayout}
                renderWithLayout={renderWithLayout}
                setRenderWithLayout={setRenderWithLayout}
                locale={locale}
                setLocale={setLocale}
            />

            <div className="relative bg-ui-bg-subtle h-[calc(100vh-200px)] overflow-auto" style={{
                backgroundColor: activeView === 'preview' && isDarkMode ? 'rgb(115, 115, 115)' : undefined
            }}>
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <div className="text-ui-fg-subtle">{t("notificationTemplates.template_editor.loading_preview")}</div>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <div className="text-ui-fg-error">
                            <p className="font-medium mb-2">{t("notificationTemplates.template_editor.error_rendering_template")}</p>
                            <p className="text-sm">{error.message}</p>
                        </div>
                    </div>
                )}

                {!isLoading && !error && renderOutput && (
                    <>
                        {activeView === "preview" && (
                            <div className="flex items-center justify-center p-4 h-full">
                                <div className="w-full max-w-full bg-white rounded-lg shadow-lg overflow-hidden h-full">
                                    <iframe
                                        ref={iframeRef}
                                        srcDoc={renderOutput.html}
                                        title="Email Preview"
                                        className="w-full h-full border-0"
                                        onLoad={handleIframeLoad}
                                    />
                                </div>
                            </div>
                        )}

                        {activeView === "html" && (
                            <div className="h-full">
                                <CodeView
                                    code={renderOutput.prettyHtml}
                                    language="html"
                                />
                            </div>
                        )}

                        {activeView === "text" && (
                            <div className="h-full">
                                <CodeView
                                    code={renderOutput.text}
                                    language="text"
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </Container>
    )
}

type ViewMode = "preview" | "html" | "text"
type PreviewTopbarProps = {
    activeView: ViewMode
    setActiveView: (view: ViewMode) => void
    isDarkMode: boolean
    setIsDarkMode: (isDark: boolean) => void
    hasLayout: boolean
    renderWithLayout: boolean
    setRenderWithLayout: (value: boolean) => void
    locale: string
    setLocale: (locale: string) => void
}

const tabTransition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.6,
}

const PreviewTopbar = ({
    activeView,
    setActiveView,
    isDarkMode,
    setIsDarkMode,
    hasLayout,
    renderWithLayout,
    setRenderWithLayout,
    locale,
    setLocale,
}: PreviewTopbarProps) => {
    const { t } = useTranslation("notification-ui")

    const tabs: Array<{ value: ViewMode; label: string }> = [
        { value: "preview", label: t("notificationTemplates.template_editor.tabs.preview") },
        { value: "html", label: t("notificationTemplates.template_editor.tabs.html") },
        { value: "text", label: t("notificationTemplates.template_editor.tabs.text") },
    ]

    // TODO: fetch from backend
    const locales = [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "es", label: "Español" },
        { value: "de", label: "Deutsch" },
        { value: "it", label: "Italiano" },
        { value: "pt", label: "Português" },
        { value: "nl", label: "Nederlands" },
        { value: "ja", label: "日本語" },
        { value: "ko", label: "한국어" },
        { value: "zhCN", label: "简体中文" },
        { value: "ar", label: "العربية" },
    ]

    return (
        <div className="flex items-center justify-between px-6 h-[52px] border-b border-ui-border-base bg-ui-bg-base">
            <div className="flex items-center gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveView(tab.value)}
                        className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${activeView === tab.value
                            ? "text-ui-fg-base"
                            : "text-ui-fg-subtle hover:text-ui-fg-base"
                            }`}
                    >
                        {activeView === tab.value && (
                            <motion.span
                                layoutId="activeTab"
                                className="absolute inset-0 bg-ui-bg-subtle rounded-md"
                                initial={false}
                                transition={tabTransition}
                            />
                        )}
                        <span className="relative">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Select value={locale} onValueChange={setLocale}>
                    <Select.Trigger id="locale-select" className="w-[140px]">
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                        {locales.map((loc) => (
                            <Select.Item key={loc.value} value={loc.value}>
                                {loc.label}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select>
                {hasLayout && (
                    <Tooltip content={t("notificationTemplates.template_editor.render_with_layout")}>
                        <IconButton
                            variant={renderWithLayout ? "primary" : "transparent"}
                            onClick={() => setRenderWithLayout(!renderWithLayout)}
                        >
                            <SquaresPlus />
                        </IconButton>
                    </Tooltip>
                )}

                {activeView === "preview" && (
                    <IconButton
                        variant="transparent"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="relative"
                    >
                        <div className="relative w-5 h-5">
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isDarkMode
                                    ? "opacity-0 scale-50 rotate-90"
                                    : "opacity-100 scale-100 rotate-0"
                                    }`}
                            >
                                <Moon />
                            </div>
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isDarkMode
                                    ? "opacity-100 scale-100 rotate-0"
                                    : "opacity-0 scale-50 -rotate-90"
                                    }`}
                            >
                                <Sun />
                            </div>
                        </div>
                    </IconButton>
                )}
            </div>
        </div>
    )
}
