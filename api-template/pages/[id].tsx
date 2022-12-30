import React from "react";
import { GetServerSideProps } from "next";

import Box from "@mui/material/Box";

import prisma from "../lib/prisma";
import { AppProps } from "../components/App";
import renderPage from "../components/util/renderPage";
import { usePagesStateValue } from "../lib/builder";
import helloWorld from "../lib/defaultApp";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const app = await prisma.app.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: app,
  };
};

const App: React.FC<AppProps> = (props) => {
  const pages = JSON.parse(props.draft ?? "[]");

  const currentPath = usePagesStateValue("path") ?? "/";

  let title = props.name;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  const findPage = () => {
    const currentPage = pages.find((page) => page.path === currentPath);
    if (currentPage) {
      return currentPage;
    }
    return pages[0];
  };

  return <Box>{renderPage(findPage() ?? {...helloWorld})}</Box>;
};

export default App;
