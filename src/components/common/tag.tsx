interface TagProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Tag = ({
    children,
    onClick
}: TagProps) => {
    const className = "px-2 py-1 text-gray-500 bg-gray-100 rounded-lg text-sm mr-2";
    return !onClick ? (
        <span className={className}>{children}</span>
    ) : <button className={className} onClick={onClick}>{children}</button>
}

export default Tag;
