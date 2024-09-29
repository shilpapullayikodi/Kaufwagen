/* eslint-disable react/jsx-no-comment-textnodes */
import { SWRConfig } from "swr";
///import GlobalStyle from "../styles";
//global configuration for all SWR hooks used throughout your app. This means any component that uses useSWR will use this fetcher to retrieve data.
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
//render the current page component
