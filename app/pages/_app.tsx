import React, { FunctionComponent } from "react";
import App, { AppContext } from "next/app";
import { fetchMeInfo } from "../lib/Requests";

const Header: FunctionComponent<{ interviewer?: { name: string, id: string } }> = ({ interviewer }) => {
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>recruit</h1>
        <h6>{interviewer?.name}</h6>
      </div>
    </Container>
  );
}

const Container: FunctionComponent = ({ children }) => {
  return (
    <div style={{ margin: "auto", maxWidth: 1024 }}>{children}</div>
  );
}

interface Props {
  interviewer: { name: string; id: string };
}

export default class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    const interviewer = await fetchMeInfo(ctx?.req?.headers?.cookie);
    console.log(interviewer);

    if (!(interviewer as any).id && !ctx.req.url.includes("login")) {
      process.browser
        ? location.href = "/login"
        : (ctx.res.writeHead(302, { Location: "/login" }), ctx.res.end());
      return;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, interviewer };
  }

  render() {
    const { Component, pageProps, interviewer } = this.props;
    return (
      <>
        <Header interviewer={interviewer} />
        <Container>
          <Component user={interviewer} {...pageProps} />
        </Container>
      </>
    );
  }
}
