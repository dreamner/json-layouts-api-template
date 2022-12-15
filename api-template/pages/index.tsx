import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";

import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Box, Container } from "@mui/material";

export const getStaticProps: GetStaticProps = async () => {
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { apps },
  };
};

type Props = {
  apps: AppProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);

  const apps = props.apps.filter(
    (app) => app.author.email === session?.user?.email
  );
  const hasApps = Boolean(apps.length);

  return (
    <Layout>
      <div className="page">
        {userHasValidSession && <h1>Your apps</h1>}
        {!userHasValidSession && (
          <p>You need to be signed in to view your apps</p>
        )}
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {userHasValidSession && (
                  <>
                    {apps.map((app) => (
                      <Grid key={app.id} item xs>
                        <div className="post">
                          <App app={app} />
                        </div>
                      </Grid>
                    ))}
                  </>
                )}

                {!hasApps && userHasValidSession && (
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
              </Grid>
            </Box>
          </Container>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
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

export default Blog;
