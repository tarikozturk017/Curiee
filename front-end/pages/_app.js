import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ThemeProvider>
  );
}
