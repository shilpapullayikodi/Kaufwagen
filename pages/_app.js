import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import Layout from "../components/Layout.js";

//global configuration for all SWR hooks used throughout your app. This means any component that uses useSWR will use this fetcher to retrieve data.
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
//render the current page component
