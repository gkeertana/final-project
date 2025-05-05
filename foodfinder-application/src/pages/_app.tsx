// src/pages/_app.tsx
import "../../styles/global.css";
import "../../styles/layout.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
