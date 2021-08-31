import cookie from "cookie";
import { useState } from "react";

export default function Header() {
    const [isOpen, setNavbarState] = useState(false);

    return (
        <div className="bg-theme-100 w-full text-white px-8 py-4">
            <i className="fas fa-bars block lg:hidden absolute cursor-pointer text-xl" style={{ right: '2.5rem', marginTop: '.8rem' }} onClick={() => setNavbarState(!isOpen)}/>
            <div className="lg:flex lg:flex-nowrap">
                <div className="flex flex-nowrap">
                    <a href="/" className="cursor-pointer block">
                        <img className="w-12" src="https://snowflakedev.org/images/logotrans.png" alt="Snowflake logo" draggable="false" />
                    </a>

                    <a href="/" className="font-bold ml-2 mt-2.5 font-changa text-xl hidden sm:block cursor-pointer">Snowflake Blog</a>
                </div>

                <div className={`lg:mt-3 lg:ml-1 -ml-1 w-full lg:w-auto bg-theme-100 p-3 lg:p-0 ${isOpen ? '' : 'hidden'} lg:block`}>
                    <NavbarLink name="Profile" href="/me"/>
                </div>
            </div>
        </div>
    );
}

function NavbarLink({ name, href }) {
    return <a href={href} className="uppercase hover:opacity-100 opacity-75 font-changa lg:ml-3 block lg:inline-block">{name}</a>
}
