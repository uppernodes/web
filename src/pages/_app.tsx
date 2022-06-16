import { AppProps } from "next/app";

import { theme } from "../styles/theme";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Context, ContextProvider } from "../contexts/ContextProvider";
import { Html, Main, NextScript } from "next/document";
import { useContext } from "react";
import Loading from "../components/Loading";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading } = useContext(Context);

  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {user && loading && <Loading />}
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default MyApp;
