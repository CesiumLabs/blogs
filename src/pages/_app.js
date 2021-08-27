import connectMongoose from '../middleware/mongodb';
import '../assets/styles/tailwind.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps}/>
}

App.getInitialProps = async () => {
    await connectMongoose();
    return {};
}