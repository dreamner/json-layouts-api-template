import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import App, { AppProps } from "../components/App"

import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const apps = await prisma.app.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { apps },
    revalidate: 10,
  };
};


type Props = {
  apps: AppProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Your apps</h1>
        <main>
          {props.apps.map((app) => (
            <div key={app.id} className="post">
              <App app={app} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
