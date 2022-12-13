import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type AppProps = {
  id: string;
  name: string;
  author: {
    name: string;
    email: string;
  } | null;
  description: string;
  published: boolean;
};

const App: React.FC<{ app: AppProps }> = ({ app }) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/a/[id]", `/a/${app.id}`)}>
      <h2>{app.name}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{app.description}</ReactMarkdown>
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
