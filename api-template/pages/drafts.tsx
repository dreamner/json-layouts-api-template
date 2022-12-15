// pages/drafts.tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";
import prisma from "../lib/prisma";
import { Box, Grid, Container } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await getSession({ req });
  // if (!session) {
  //   res.statusCode = 403;
  //   return { props: { drafts: [] } };
  // }

  const drafts = await prisma.app.findMany({
    where: {
      // author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true, email: true },
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

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const router = useRouter();

  const apps = props.drafts.filter(
    (app) => app.author.email === session.user.email
  );
  const hasApps = Boolean(apps.length);

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
        <h1>{props.drafts.length} Drafts</h1>
        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {props.drafts.map((app) => (
                  <Grid item xs={4} key={app.id}>
                    <div className="post">
                      <App app={app} />
                    </div>
                  </Grid>
                ))}
              </Grid>
              {!hasApps && (
                <div>
                  <h6>You do not have any published apps</h6>
                  <button onClick={() => router.push("/create")}>
                    Create app
                  </button>
                  <button onClick={() => router.push("/drafts")}>
                    Go to drafts
                  </button>
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

export default Drafts;
