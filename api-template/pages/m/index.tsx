// pages/drafts.tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import { Box, Grid, Container, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import { AuthSpinner } from "..";
import Layout from "../../components/Layout";
import App from "../../components/App";

export const getServerSideProps: GetServerSideProps = async () => {
  const drafts = await prisma.app.findMany({
    include: {
      author: {
        select: { name: true, email: true, image: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: any;
};

const Index: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const apps = props.drafts.filter(
    (app) => app.author.email === session?.user?.email
  );
  const hasApps = Boolean(apps.length);

  if (status === "loading") {
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

  return (
    <Layout>
      <div className="page">
        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">My apps</Typography>
              <Grid spacing={2} container>
                {apps.map((app) => (
                  <Grid item lg={3} md={6} xs={12} key={app.id}>
                    <div className="post">
                      <App app={app} />
                    </div>
                  </Grid>
                ))}
              </Grid>
              {!hasApps && (
                <div>
                  <h6>You do not have any draft applications</h6>
                  <Button
                    variant={"outlined"}
                    onClick={() => router.push("/create")}
                  >
                    Create app
                  </Button>
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Index;