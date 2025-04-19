function Notification({ message, type = 'info', onClose }) {
    try {
        React.useEffect(() => {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }, []);

        const bgColor = {
            info: 'bg-blue-50',
            success: 'bg-green-50',
            error: 'bg-red-50',
            warning: 'bg-yellow-50'
        }[type];

        const iconClass = {
            info: 'fa-info-circle text-blue-500',
            success: 'fa-check-circle text-green-500',
            error: 'fa-exclamation-circle text-red-500',
            warning: 'fa-exclamation-triangle text-yellow-500'
        }[type];

        return (
            <div className={`notification ${bgColor}`} data-name="notification">
                <div className="flex items-center">
                    <i className={`fas ${iconClass} text-lg mr-2`}></i>
                    <p className="flex-grow">{message}</p>
                    <button onClick={onClose} className="ml-4" data-name="close-notification">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Notification render error:', error);
        reportError(error);
        return null;
    }
}
