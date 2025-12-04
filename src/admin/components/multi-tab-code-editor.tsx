import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AdminNotificationTemplate } from "../../types/http/notification-template"

type CodeTab = keyof AdminNotificationTemplate["template_code"]

type MultiTabCodeEditorProps = {
    templateCode: AdminNotificationTemplate["template_code"]
    onJsxChange: (code: string) => void
    onAdditionalChange: (code: string) => void
    onPreviewPropsChange: (code: string) => void
    onI18nKeysChange: (code: string) => void
}

const tabTransition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.6,
}

export const MultiTabCodeEditor = ({
    templateCode,
    onJsxChange,
    onAdditionalChange,
    onPreviewPropsChange,
    onI18nKeysChange,
}: MultiTabCodeEditorProps) => {
    const { t } = useTranslation("notification-ui")
    const [activeTab, setActiveTab] = useState<CodeTab>("jsx")

    const tabs: Array<{ value: CodeTab; label: string; description: string }> = [
        {
            value: "jsx",
            label: t("notificationTemplates.template_editor.tabs.jsx", "JSX"),
            description: t("notificationTemplates.template_editor.tabs.jsx_description", "Email template markup")
        },
        {
            value: "additional",
            label: t("notificationTemplates.template_editor.tabs.additional", "Additional Code"),
            description: t("notificationTemplates.template_editor.tabs.additional_description", "Pre-render calculations")
        },
        {
            value: "preview_props",
            label: t("notificationTemplates.template_editor.tabs.preview_props", "Preview Props"),
            description: t("notificationTemplates.template_editor.tabs.preview_props_description", "Test data for preview")
        },
        {
            value: "i18n",
            label: t("notificationTemplates.template_editor.tabs.i18n", "i18n Keys"),
            description: t("notificationTemplates.template_editor.tabs.i18n_description", "Translation keys")
        },
    ]

    const getHandlerForTab = (tab: CodeTab) => {
        switch (tab) {
            case "jsx":
                return onJsxChange
            case "additional":
                return onAdditionalChange
            case "preview_props":
                return onPreviewPropsChange
            case "i18n":
                return onI18nKeysChange
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-1 px-4 py-2 border-b border-ui-border-base bg-ui-bg-base">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${activeTab === tab.value
                            ? "text-ui-fg-base"
                            : "text-ui-fg-subtle hover:text-ui-fg-base"
                            }`}
                        title={tab.description}
                    >
                        {activeTab === tab.value && (
                            <motion.span
                                layoutId="activeEditorTab"
                                className="absolute inset-0 bg-ui-bg-subtle rounded-md"
                                initial={false}
                                transition={tabTransition}
                            />
                        )}
                        <span className="relative">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-hidden">
                <CodeEditor
                    key={activeTab}
                    code={templateCode[activeTab]}
                    onChange={getHandlerForTab(activeTab)}
                />
            </div>
        </div>
    )
}
