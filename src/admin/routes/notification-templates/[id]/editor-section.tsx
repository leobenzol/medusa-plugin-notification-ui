import { Container, Button, toast } from "@medusajs/ui"
import { useState, useEffect, useRef, useCallback } from "react"
import { useUpdateNotificationTemplate } from "../../../hooks/use-notification-templates"
import { useTranslation } from "react-i18next"
import { MultiTabCodeEditor } from "../../../components/multi-tab-code-editor"
import { AdminNotificationTemplate } from "../../../../types/http/notification-template"

type EditorSectionProps = {
    templateId: string
    templateCode: AdminNotificationTemplate["template_code"]
    onCodeChange: (code: AdminNotificationTemplate["template_code"]) => void
}

export const EditorSection = ({
    templateId,
    templateCode,
    onCodeChange,
}: EditorSectionProps) => {
    const { t } = useTranslation("notification-ui")
    const [editedCode, setEditedCode] = useState(templateCode)
    const [hasChanges, setHasChanges] = useState(false)
    const debounceTimerRef = useRef<NodeJS.Timeout>()
    const { mutateAsync: updateTemplate, isPending: isSaving } = useUpdateNotificationTemplate(templateId)

    // Update edited code when template changes from props
    useEffect(() => {
        setEditedCode(templateCode)
        setHasChanges(false)
    }, [templateCode])

    // Check for changes
    const checkForChanges = useCallback((code: typeof editedCode) => {
        const hasChange =
            code.jsx !== templateCode.jsx ||
            code.additional !== templateCode.additional ||
            code.preview_props !== templateCode.preview_props ||
            code.i18n !== templateCode.i18n
        setHasChanges(hasChange)
    }, [templateCode])

    // Debounced code change handlers
    const handleJsxChange = useCallback((newCode: string) => {
        const updated = { ...editedCode, jsx: newCode }
        setEditedCode(updated)
        checkForChanges(updated)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            onCodeChange(updated)
        }, 1000)
    }, [editedCode, checkForChanges, onCodeChange])

    const handleAdditionalChange = useCallback((newCode: string) => {
        const updated = { ...editedCode, additional: newCode }
        setEditedCode(updated)
        checkForChanges(updated)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            onCodeChange(updated)
        }, 1000)
    }, [editedCode, checkForChanges, onCodeChange])

    const handlePreviewPropsChange = useCallback((newCode: string) => {
        const updated = { ...editedCode, preview_props: newCode }
        setEditedCode(updated)
        checkForChanges(updated)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            onCodeChange(updated)
        }, 1000)
    }, [editedCode, checkForChanges, onCodeChange])

    const handleI18nChange = useCallback((newCode: string) => {
        const updated = { ...editedCode, i18n: newCode }
        setEditedCode(updated)
        checkForChanges(updated)

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        debounceTimerRef.current = setTimeout(() => {
            onCodeChange(updated)
        }, 1000)
    }, [editedCode, checkForChanges, onCodeChange])

    // Cleanup debounce timer
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    const handleSave = async () => {
        try {
            await updateTemplate({
                template_code: editedCode
            })
            toast.success(t("notificationTemplates.toast.update"))
            setHasChanges(false)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update template")
        }
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 h-[52px] border-b border-ui-border-base bg-ui-bg-base">
                <span className="text-sm font-medium text-ui-fg-base">{t("notificationTemplates.template_editor.title")}</span>
                <Button
                    size="small"
                    variant="primary"
                    onClick={handleSave}
                    disabled={!hasChanges || isSaving}
                    isLoading={isSaving}
                >
                    {t("actions.save")}
                </Button>
            </div>

            <div className="relative bg-ui-bg-subtle h-[calc(100vh-200px)]">
                <MultiTabCodeEditor
                    templateCode={editedCode}
                    onJsxChange={handleJsxChange}
                    onAdditionalChange={handleAdditionalChange}
                    onPreviewPropsChange={handlePreviewPropsChange}
                    onI18nKeysChange={handleI18nChange}
                />
            </div>
        </Container>
    )
}
