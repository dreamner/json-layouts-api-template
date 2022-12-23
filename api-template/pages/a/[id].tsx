import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { AppProps } from "../../components/App";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

import {
  Avatar,
  Box,
  Paper,
  Button,
  Container,
  Chip,
  CircularProgress,
} from "@mui/material";
import { AuthSpinner } from "..";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const app = await prisma.app.findUnique({
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
    props: app,
  };
};

const App: React.FC<AppProps> = (props) => {
  const { data: session, status } = useSession();

  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);

  async function publishPost(id: string): Promise<any> {
    try {
      setPublishing(true);
      const res = await fetch(`/api/publish/${id}`, {
        method: "PUT",
      });
      if (res.json()) {
        setPublishing(false);
        await Router.push("/");
      } else setPublishing(false);
    } catch (e) {
      setPublishing(false);
    }
  }

  async function deletePost(id: string): Promise<void> {
    try {
      setPublishing(true);
      const res = await fetch(`/api/app/${id}`, {
        method: "DELETE",
      });
      if (res.json()) {
        setPublishing(false);
        await Router.push("/");
      } else setPublishing(false);
    } catch (e) {
      setPublishing(false);
    }
  }

  if (status === "loading") {
    return <AuthSpinner />;
  }

  if (!session) {
    return (
      <Layout>
        <h1>App</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  let title = props.name;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Avatar src={props.image}>{title[0]}</Avatar>
                <h2>{title}</h2>
                <Chip
                  avatar={<Avatar alt="Natacha" src={session.user.image} />}
                  label={`By ${props?.author?.name || "Unknown author"}`}
                  variant="outlined"
                />
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none", mr: 2 }}
                  onClick={() => Router.push(`/preview/${props.id}`)}
                >
                  Preview
                </Button>
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{ maxHeight: "30vh", overflow: "hidden", my: 5 }}
            >
              {/* <ThemeProvider theme={defaultTheme}>
                <Preview />
              </ThemeProvider> */}
            </Paper>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mr: 2 }}
              className="button"
              onClick={() => Router.push(`/builder/${props.id}`)}
            >
              Customize
            </Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mr: 2 }}
              disabled={props.published || publishing}
              className="button"
              onClick={() => publishPost(props.id)}
            >
              {deleting ? <CircularProgress size={20} /> : "Publish app"}
            </Button>
            <>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", mr: 2 }}
                className="button"
                onClick={() => Router.push(`/preferences/${props.id}`)}
              >
                Preferences
              </Button>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", mr: 2 }}
                className="button"
                onClick={() => Router.push(`/res/${props.id}`)}
              >
                Resources
              </Button>
              <Button
                disabled={deleting}
                variant="outlined"
                color="error"
                onClick={() => deletePost(props.id)}
              >
                {deleting ? <CircularProgress size={20} /> : "Delete"}
              </Button>
            </>
            <ReactMarkdown>{props.description}</ReactMarkdown>
          </Box>
        </Container>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        .button {
          margin-left: 1rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default App;
