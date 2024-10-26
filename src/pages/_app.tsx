import api from "@/components/api";
import UserDataProvider from "@/contexts/UserData";
import "@/styles/globals.css";
import theme from "@/theme";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher: api,
          refreshInterval: 5000,
        }}
      >
        <UserDataProvider>
          <Component {...pageProps} />
        </UserDataProvider>
      </SWRConfig>
    </MantineProvider>
  );
}
