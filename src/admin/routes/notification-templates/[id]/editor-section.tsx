import { Container, Button, toast } from "@medusajs/ui"
import { useState, useEffect, useRef, useCallback } from "react"
import { useUpdateNotificationTemplate } from "../../../hooks/use-notification-templates"
import { useTranslation } from "react-i18next"
import { CodeEditor } from "../../../components/code-editor"

type EditorSectionProps = {
    templateId: string
    templateCode: string
    onCodeChange: (code: string) => void
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

    // Debounced code change handler
    const handleCodeChange = useCallback((newCode: string) => {
        setHasChanges(newCode !== templateCode)
        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        // Set new timer for debounced update
        debounceTimerRef.current = setTimeout(() => {
            setEditedCode(newCode)
            onCodeChange(newCode)
        }, 1000) // 1 second debounce
    }, [templateCode, onCodeChange])

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
                template_code: editedCode,
            })
            toast.success(t("toast.update"))
            setHasChanges(false)
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update template")
        }
    }

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 h-[52px] border-b border-ui-border-base bg-ui-bg-base">
                <span className="text-sm font-medium text-ui-fg-base">{t("template_editor.title")}</span>
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
                <div className="h-full">
                    <CodeEditor
                        code={editedCode}
                        onChange={handleCodeChange}
                    />
                </div>
            </div>
        </Container>
    )
}
