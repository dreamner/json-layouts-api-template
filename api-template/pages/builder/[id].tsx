// pages/p/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Preview from "../../components/Preview";
import BuilderTabs from "../../components/BuilderTabs";
import { PagesContextProvider } from "../../lib/builder";

import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "../../lib/defaultheme";
import ToggleButtons from "../../components/ToggleButtons";

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
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.name;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <PagesContextProvider>
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
    </PagesContextProvider>
  );
};

export default App;
