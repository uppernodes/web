import Document, { Html, Head, Main, NextScript } from "next/document";
import { useContext } from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Didact+Gothic&family=Quicksand:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body
          style={{
            backgroundColor: "#FFF",
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/*
comforta = (light, regular, medium, semibold, bold) => uppernodes
quicksand = (light, regular, medium, semibold, bold) => projects
didact gothic = (regular) => paragraph
font-family: 'Comfortaa', cursive;
font-family: 'Didact Gothic', sans-serif;
font-family: 'Quicksand', sans-serif;
*/
