import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type AppProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const App: React.FC<{ app: AppProps }> = ({ app }) => {
  const authorName = app.author ? app.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${app.id}`)}>
      <h2>{app.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={app.content} />
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
