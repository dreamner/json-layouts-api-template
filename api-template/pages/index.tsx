import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import App, { AppProps } from "../components/App";

import prisma from "../lib/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import CaategoryDialog from "../components/CategoryDialog";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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
  } catch (e) {
    return { props: { apps: [], error: e } };
  }
};

type Props = {
  apps: AppProps[];
  error?: any;
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
        <main>
          <Container sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ my: 5 }}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Autocomplete
                      size="small"
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
                  </Box>

                  <Box>
                    <CaategoryDialog appId={undefined} />
                    <Button
                      size="small"
                      onClick={() => router.push("/explore")}
                      sx={{ textTransform: "none", ml: 2 }}
                      disableElevation
                      variant="contained"
                    >
                      Explore Apps
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Grid sx={{ mb: 4 }} container spacing={2}>
                <>
                  {props.apps.map((app) => (
                    <Grid key={app.id} item lg={3} md={6} xs={12}>
                      <div className="post">
                        <App app={app} />
                      </div>
                    </Grid>
                  ))}
                </>

                {!props.apps.length && userHasValidSession && (
                  <div>
                    <h6>There are 0 published apps</h6>
                    <Button
                      variant={"outlined"}
                      onClick={() => router.push("/create")}
                    >
                      Create app
                    </Button>
                    <Button
                      sx={{ ml: 2 }}
                      variant={"outlined"}
                      onClick={() => router.push("/drafts")}
                    >
                      My Drafts
                    </Button>
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
      </Box>
    </Box>
  );
};
