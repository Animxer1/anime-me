import { Html, Head, Main, NextScript } from "next/document";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={`${inter.className}bg-gray-900 text-white min-h-screen px-6`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
