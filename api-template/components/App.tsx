import React from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

import Edit from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export type AppProps = {
  id: string;
  name: string;
  author: {
    image: string;
    name: string;
    email: string;
  } | null;
  description: string;
  published: boolean;
  image: string;
  meta: string;
  favicon: string;
  password: string;
  passwordProtectionMessage: string;
  draft: string;
  title: string;
  isNew: boolean;
};

const App: React.FC<{ app: AppProps }> = ({ app }) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  const { data: session, status } = useSession();
  return (
    <div onClick={() => Router.push("/[id]", `/${app.id}`)}>
      <Chip
        color={app.published ? "success" : "primary"}
        size="small"
        sx={{ mb: 1 }}
        label={
          app.published ? `${app.isNew ? "Live (New)" : "Live"}` : `${app.isNew ? "Draft (New)" : "Draft"}`
        }
      />
      <img
        height="108"
        width="100%"
        style={{ borderRadius: "4px" }}
        alt={app.name}
        src={app.image}
      />
      <h2>{app.name}</h2>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Chip
            size="small"
            avatar={<Avatar alt="Natacha" src={app.author.image} />}
            label={`By ${authorName}`}
            variant="outlined"
          />
        </Box>

        <Box>
          {session?.user?.email === app?.author.email && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                Router.push("/a/[id]", `/a/${app.id}`);
              }}
            >
              <Edit />
            </IconButton>
          )}
        </Box>
      </Box>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default App;
