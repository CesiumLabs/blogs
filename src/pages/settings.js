import { useEffect } from 'react';
import Frame from '../components/frame';

export default function Settings() {
    useEffect(() => {
        window.addEventListener('load', () => {
            const customBgInputElement = document.getElementById('custom_bg_input');
            const customBgColor = localStorage.getItem('custom_bg');
            customBgInputElement.value = customBgColor || 'whitesmoke';

            customBgInputElement.addEventListener('keydown', (e) => {
                if (e.key === "Enter" && customBgInputElement.value) {
                    localStorage.setItem('custom_bg', customBgInputElement.value);
                    (document.body || document.documentElement).style.backgroundColor = customBgInputElement.value;
                }
            });
        });
    }, []);

    return <Frame title="Settings" description="Settings for the snowflake blog website's user interface.">
        <div className="p-4 md:p-10">
            <div className="bg-theme-100 rounded-lg p-8">
                <table className="text-white w-full">
                    <tr>
                        <td className="w-1/4">
                            <p className="text-xl font-bold">Background Color</p>
                            <p className="opacity-75">The background color you want to see the blog with! Default is whitesmoke.</p>
                        </td>
                        <td>
                            <input className="ml-2 px-2 py-1 rounded-default outline-none text-black block w-full" placeholder="Your color here..." id="custom_bg_input"/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </Frame>
}