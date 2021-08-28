export default function Header() {
    return (
        <div className="bg-theme-100 w-full text-white px-8 py-4">
            <div className="flex flex-nowrap">
                <a href="/" className="cursor-pointer block">
                    <img className="w-12" src="https://snowflakedev.org/images/logotrans.png" alt="Snowflake logo" draggable="false" />
                </a>

                <h2 className="font-bold ml-2 mt-2.5 font-changa text-xl hidden sm:block">Snowflake Blog</h2>
            </div>
        </div>
    );
}
