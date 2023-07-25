import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import '../styles/globals.css'
import Layout from "@/Layout/Layout";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { SessionProvider } from "next-auth/react"


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.remove());

export default function App({ Component, pageProps : {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <div>
          <ToastContainer />
          <Component {...pageProps} />
          </div>
        </Layout>
      </Provider>
    </SessionProvider>
  )
}
