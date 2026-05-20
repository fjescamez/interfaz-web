

function InfoCard({
    title,
    className = "",
    children,
    footer
}) {
    return (
        <div className={`infoCard flex ${className}`}>
            <div className="title">
                <p>{title}</p>
            </div>

            <div className="body">
                {children}
            </div>

            {footer && (
                <div className="footer">
                    {footer}
                </div>
            )}
        </div>
    );
}

export default InfoCard;


