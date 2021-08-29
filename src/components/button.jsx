export function SocialButton({ svg, href, color, children, onClick }) {
    return (
        <a href={href} onClick={onClick} className={`ml-1 mt-1 inline-block text-white rounded-default px-4 py-2 font-bold cursor-pointer ${color}`}>
            <i className={svg} /> {children}
        </a>
    );
}
