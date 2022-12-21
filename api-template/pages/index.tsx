import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";

import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Container,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

export const getServerSideProps: GetServerSideProps = async () => {
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true, image: true },
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

const Apps: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <AuthSpinner />;
  }
  const userHasValidSession = Boolean(session);

  return (
    <Layout>
      <div className="page">
        {!userHasValidSession && (
          <p>You need to be signed in to view your apps</p>
        )}
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ my: 5 }}>
                {userHasValidSession && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={props.apps.map((app) => ({
                      value: app.id,
                      label: app.name,
                    }))}
                    sx={{ width: 300 }}
                    onChange={(e, v) => {
                      if ((v as any)?.value)
                        router.push(`/${(v as any).value}`);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search apps" />
                    )}
                  />
                )}
              </Box>
              <Grid container spacing={2}>
                {userHasValidSession && (
                  <>
                    {props.apps.map((app) => (
                      <Grid key={app.id} item lg={3} md={6} xs={12}>
                        <div className="post">
                          <App app={app} />
                        </div>
                      </Grid>
                    ))}
                  </>
                )}

                {!props.apps.length && userHasValidSession && (
                  <div>
                    <h6>There are 0 published apps</h6>
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
          border-radius: 4px;
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

export default Apps;

export const AuthSpinner = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
        <Typography>Checking login status</Typography>
      </Box>
    </Box>
  );
};
