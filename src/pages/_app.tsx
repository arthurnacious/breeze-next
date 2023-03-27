import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import globalTheme from "../../theme/index";
import "@/styles/globals.css";
// import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={globalTheme}>
      {/* <NotificationsProvider> */}
          <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      {/* </NotificationsProvider> */}
    </MantineProvider>
  );
}
