import Head from "next/head";
import Header from "./header";

export default function Frame({ title, description = "A blog written by the snowflake development community", image = "https://snowflakedev.org/images/logo.png", children }) {
    title = `Snowflake Blog${title ? ` | ${title}` : ""}`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <link rel="icon" type="image/png" href="https://snowflakedev.org/images/logotrans.png" />

                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={description} />
                <meta itemProp="image" content={image} />

                <meta property="og:url" content="https://blogs.snowflakedev.org" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:thumbnail" content={image} />
                <meta property="og:color" content="#7298da" />

                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />

                <link href="https://fonts.googleapis.com/css?family=News+Cycle|Titillium+Web:wght@700|Changa:wght@800" rel="stylesheet" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
            </Head>

            <div className="min-h-screen">
                <Header/>
                {children}
            </div>
            
            <div className="text-full text-white bg-theme-100 w-full font-changa text-center text-lg py-4 mt-4">
                <p>Snowflake Development © 2021</p>
            </div>
        </>
    );
}
