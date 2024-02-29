import type { AppProps } from "next/app";
import { setupDiscoveryCms } from "@discoverycms/connector";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import components from "../components/cms";
import Head from "next/head";

setupDiscoveryCms({
  apiRoot: process.env.NEXT_PUBLIC_DISCOVERY_API_ROOT || "",
  apiToken: process.env.NEXT_PUBLIC_DISCOVERY_API_TOKEN || "",
  propertyTitle: process.env.NEXT_PUBLIC_PROPERTY_TITLE || "",
  disableCache: true,
  enableConnectorScript: true,
  components,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>FlixOlé</title>
      </Head>
      <script
        id="connectorScript"
        async={true}
        src={"discovery-cms-connector.js"}
        data-preview-enabled={router.isPreview}
      />
      <AppCacheProvider {...props}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppCacheProvider>
    </>
  );
}
