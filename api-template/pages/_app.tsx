// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { PagesContextProvider } from "../lib/builder";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PagesContextProvider>
        <Component {...pageProps} />
      </PagesContextProvider>
    </SessionProvider>
  );
};
export default App;
