import React from "react";
import Router from "next/router";
import { Avatar, Chip, IconButton, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { Edit } from "@mui/icons-material";

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
};

const App: React.FC<{ app: AppProps }> = ({ app }) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  const { data: session, status } = useSession();
  return (
    <div onClick={() => Router.push("/[id]", `/${app.id}`)}>
      <Avatar alt={app.name} src={app.image}>
        {app.name[0]}
      </Avatar>
      <h2>{app.name}</h2>
      <Box sx={{ display: "flex" }} >
        <Box sx={{ flexGrow: 1 }}>
        
        <Chip
          avatar={<Avatar alt="Natacha" src={app.author.image} />}
          label={`By ${authorName}`}
          variant="outlined"
        />
        </Box>
       
        <Box>
          {session?.user?.email === app?.author.email && (
            <IconButton onClick={(e) => {
              e.stopPropagation();
              Router.push("/a/[id]", `/a/${app.id}`)
            }}>
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
