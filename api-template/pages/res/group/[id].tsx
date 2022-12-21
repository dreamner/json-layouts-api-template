import React from "react";
import { GetServerSideProps } from "next";
import { Container, Typography } from "@mui/material";
import prisma from "../../../lib/prisma";
import { AppProps } from "../../../components/App";
import Layout from "../../../components/Layout";
import ResourceTabs from "../../../components/ResourceTabs";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const resourceGroup = await prisma.resourceGroup.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      tables: {
        select: { name: true, rows: true, id: true, columns: true },
      },
      images: {
        select: { url: true, id: true },
      },
    },
  });
  return {
    props: resourceGroup,
  };
};

const App: React.FC<any> = (props) => {
  return (
    <Layout>
      <Container>
        <Typography variant="h4">Resources</Typography>
        <ResourceTabs />
      </Container>
    </Layout>
  );
};

export default App;
