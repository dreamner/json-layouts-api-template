import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CreateResourceGroupDialog from "../../components/CreateResourceGroupDialog";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const app = await prisma.app.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      resourceGroups: {
        select: { name: true, id: true },
      },
    } as any,
  });
  return {
    props: app,
  };
};

const App: React.FC<any> = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <Container className="page">
        <Box sx={{ display: "flex" }}>
          <h1 style={{ flexGrow: 1 }}>Resource Groups</h1>
          {Boolean(props.resourceGroups.length) && (
            <div>
              <CreateResourceGroupDialog appId={props.id} />
            </div>
          )}
        </Box>

        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid spacing={2} container>
                {props.resourceGroups.map((app) => (
                  <Grid
                    onClick={() => router.push(`/res/group/${app.id}`)}
                    item
                    lg={4}
                    md={6}
                    xs={12}
                    key={app.id}
                  >
                    <div className="post">
                      <Typography variant="h5">{app.name}</Typography>
                      <Typography variant="caption"> {app.tag}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
              {!Boolean(props.resourceGroups.length) && (
                <div>
                  <h6>You do not have resource groups</h6>
                  <CreateResourceGroupDialog appId={props.id} />
                </div>
              )}
            </Box>
          </Box>
        </Container>
      </Container>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
          padding: 9px;
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

export default App;
