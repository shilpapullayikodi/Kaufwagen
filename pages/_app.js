import { SWRConfig } from "swr";
import Layout from "../components/Layout.js";
//global configuration for all SWR hooks used throughout your app. This means any component that uses useSWR will use this fetcher to retrieve data.
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
//render the current page component
