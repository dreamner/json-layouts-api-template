import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";


import Preview from "../../components/Preview";
import { AuthSpinner } from "..";
import Layout from "../../components/Layout";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.app.findUnique({
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
    props: post,
  };
};


const App: React.FC<AppProps> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>Preview</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  let title = props.name;
  if (!props.published) {
    title = `${title} (Draft)`;
  }




  if (true) {
    return <Preview fullScreen />;
  }

};

export default App;
