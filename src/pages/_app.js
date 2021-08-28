import { useEffect } from "react";
import "../assets/styles/tailwind.css";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        let customBg = localStorage.getItem("custom_bg");
        if (customBg) (document.body || document.documentElement).style.backgroundColor = customBg;
    }, []);

    return <Component {...pageProps} />;
}
