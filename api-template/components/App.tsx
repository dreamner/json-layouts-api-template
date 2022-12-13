import React from "react";
import Router from "next/router";
import { Avatar } from "@mui/material";

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
};

const App: React.FC<{ app: AppProps }> = ({ app }) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/a/[id]", `/a/${app.id}`)}>
      <Avatar alt={app.name} src={app.image}>{app.name[0]}</Avatar>
      <h2>{app.name}</h2>
      <small>By {authorName}</small>
      {/* <ReactMarkdown>{app.description}</ReactMarkdown> */}
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
