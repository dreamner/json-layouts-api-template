// pages/p/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Preview from "../../components/Preview";
import BuilderTabs from "../../components/BuilderTabs";

import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "../../lib/defaultheme";
import ToggleButtons from "../../components/ToggleButtons";
import { AuthSpinner } from "..";
import useApp from "../../hooks/useApp";
import { usePagesStateValue } from "../../lib/builder";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const post = await prisma.app.findUnique({
//     where: {
//       id: String(params?.id),
//     },
//     include: {
//       author: {
//         select: { name: true, email: true },
//       },
//     },
//   });
//   return {
//     props: post,
//   };
// };

const App: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const app = useApp({ id: router.query.id });
  const props = app; // to ref
  const loadingApp = usePagesStateValue("loaders.apps");

  if (status === "loading" || loadingApp) {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  let title = props.name;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Grid container>
      <Grid item xs={8}>
        <Paper
          sx={{
            bgcolor: "lightgray",
            minHeight: "85vh",
            p: 3,
            overflow: "auto",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mb: 2, flexGrow: 1, display: "flex" }}>
              <Avatar sx={{ mr: 1 }} src={props.image}>
                {title[0]}
              </Avatar>
              <Box>
                <Typography variant="h6">{title}</Typography>
              </Box>
            </Box>
            <ToggleButtons app={props} />
          </Box>

          <ThemeProvider theme={defaultTheme}>
            <Preview />
          </ThemeProvider>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <BuilderTabs />
      </Grid>
    </Grid>
  );
};

export default App;
