function CodeEditor({ code, onChange, language = 'javascript', readOnly = false }) {
    try {
        return (
            <div className="code-editor rounded-lg" data-name="code-editor">
                <div className="flex justify-between items-center mb-2 px-4 py-2 bg-gray-800 rounded-t-lg">
                    <span className="text-gray-400">{language}</span>
                    {!readOnly && (
                        <button 
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                                navigator.clipboard.writeText(code);
                            }}
                            data-name="copy-code"
                        >
                            <i className="far fa-copy"></i>
                        </button>
                    )}
                </div>
                <textarea
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-900 text-gray-100 font-mono p-4 rounded-b-lg"
                    rows="10"
                    readOnly={readOnly}
                    spellCheck="false"
                    data-name="code-input"
                ></textarea>
            </div>
        );
    } catch (error) {
        console.error('CodeEditor render error:', error);
        reportError(error);
        return null;
    }
}
