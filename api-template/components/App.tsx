import React from "react";
import Router from "next/router";
import { Avatar, Chip } from "@mui/material";
import { useSession } from "next-auth/react";

export type AppProps = {
  id: string;
  name: string;
  author: {
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
    <div onClick={() => Router.push("/a/[id]", `/a/${app.id}`)}>
      <Avatar alt={app.name} src={app.image}>
        {app.name[0]}
      </Avatar>
      <h2>{app.name}</h2>
      <Chip
        avatar={<Avatar alt="Natacha" src={session.user.image} />}
        label={`By ${authorName}`}
        variant="outlined"
      />
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
