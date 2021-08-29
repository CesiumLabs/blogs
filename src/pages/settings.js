import { useEffect, useRef } from "react";
import Frame from "../components/frame";

export default function Settings() {
    const customBgInputElement = useRef(null);

    useEffect(() => {
        window.addEventListener("load", () => {
            if (!customBgInputElement.current) return;
            const customBgColor = localStorage.getItem("custom_bg");
            customBgInputElement.current.value = customBgColor || "whitesmoke";

            customBgInputElement.current.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && customBgInputElement.current.value) {
                    localStorage.setItem("custom_bg", customBgInputElement.current.value);
                    (document.body || document.documentElement).style.backgroundColor = customBgInputElement.current.value;
                }
            });
        });
    }, []);

    return (
        <Frame title="Settings" description="Settings for the snowflake blog website's user interface.">
            <div className="p-4 md:p-10">
                <div className="bg-theme-100 rounded-lg p-8">
                <h1 className="text-white text-5xl font-bold">Settings</h1>
                    <p className="opacity-75 text-white">Settings for the snowflake blog website's user interface.</p>

                    <table className="text-white w-full mt-2">
                        <tr>
                            <td className="w-1/4">
                                <p className="text-xl font-bold">Background Color</p>
                                <p className="opacity-75">The background color you want to see the blog with! Default is whitesmoke.</p>
                            </td>
                            <td>
                                <input className="ml-2 px-2 py-1 rounded-default outline-none text-black block w-full" placeholder="Your color here..." ref={customBgInputElement} />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </Frame>
    );
}
