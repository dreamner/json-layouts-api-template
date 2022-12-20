import React, { useState } from "react";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { AppProps } from "../../components/App";
import { usePagesStateValue } from "../../lib/builder";
import Layout from "../../components/Layout";
import { Typography } from "@mui/material";

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
        revalidate: 5
    };
};

const App: React.FC<AppProps> = (props) => {
    const pages = JSON.parse(props.draft ?? "[]");


    const currentPath = usePagesStateValue("path") ?? "/"


    let title = props.name;

    if (!props.published) {
        title = `${title} (Draft)`;

    }
    return (
        <Layout>
            <Typography variant="h4" >Resources</Typography>
        </Layout>
    );
};

export default App;
