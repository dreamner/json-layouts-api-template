import React from "react";
import { Container } from "@mui/material";
import { usePagesStateDisptch, usePagesStateValue } from "../../lib/builder";
import renderBox from "../util/renderBox";
import renderText from "../util/renderText";
import renderStack from "../util/renderStack";


interface IDefaultLayout {
  children?: React.ReactNode;
  name: string;
}

export default function DefaultLayout({ children, name }: IDefaultLayout) {
  const pages = usePagesStateValue("pages");
  const pageTitle = React.useMemo(() => renderText(name, "h2"), [name]);
  // const linkToPages = React.useMemo(
  //   () => pages.map((page: any) => renderBox({})),
  //   [pages]
  // // );
  // const linkStack = React.useMemo(
  //   () => renderStack(linkToPages),
  //   [linkToPages]
  // );
  return (
    <Container>
      {pageTitle}
      {children}
      {/* {linkStack} */}
    </Container>
  );
}