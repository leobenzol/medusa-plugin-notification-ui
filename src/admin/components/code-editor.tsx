import { useState, useRef } from "react"
import { Editor as PrismEditor } from "prism-react-editor"
import "prism-react-editor/prism/languages/jsx"

// Adds comment toggling and auto-indenting for JSX
import "prism-react-editor/languages/jsx"

import "prism-react-editor/layout.css"
import "prism-react-editor/themes/vs-code-dark.css"

type CodeEditorProps = {
    code: string
    onChange?: (code: string) => void
}

export const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
    const [initialCode] = useState(code)
    const editorValueRef = useRef(code)

    const handleCodeChange = (value: string) => {
        editorValueRef.current = value
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className="relative h-full">
            <div className="overflow-auto h-full bg-ui-bg-subtle">
                <div className="h-full">
                    <PrismEditor
                        value={initialCode}
                        onUpdate={handleCodeChange}
                        language="jsx"
                        lineNumbers
                        tabSize={2}
                        insertSpaces
                        style={{
                            fontSize: "12px",
                            fontFamily: "monospace",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
