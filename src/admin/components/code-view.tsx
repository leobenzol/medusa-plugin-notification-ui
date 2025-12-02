import { Highlight, themes } from "prism-react-renderer"

type CodeViewProps = {
    code: string
    language: "html" | "text"
}

export const CodeView = ({ code, language }: CodeViewProps) => {
    const prismLanguage = language === "text" ? "markdown" : language

    return (
        <div className="relative h-full">
            <div className="overflow-auto h-full bg-ui-bg-subtle">
                {language === "text" ? (
                    <pre className="font-mono text-sm text-ui-fg-base whitespace-pre-wrap break-words p-6">
                        {code}
                    </pre>
                ) : (
                    <div className="p-6">
                        <Highlight theme={themes.vsDark} code={code} language={prismLanguage}>
                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre className={`${className} text-sm overflow-x-auto`} style={style}>
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })} className="flex">
                                            <span className="inline-block w-12 flex-shrink-0 text-right pr-4 select-none opacity-50">
                                                {i + 1}
                                            </span>
                                            <span className="flex-1 min-w-0">
                                                {line.map((token, key) => (
                                                    <span key={key} {...getTokenProps({ token })} />
                                                ))}
                                            </span>
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </div>
                )}
            </div>
        </div>
    )
}
