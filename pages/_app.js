import { Provider } from "next-auth/client";

import "../styles/globals.scss";
import "./../styles/plugins/font-awesome.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
