import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { useSession } from "next-auth/react";

import {
    Avatar,
    Box,
    Paper,
    Button,
    Container,
    Chip,
    CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import prisma from "../lib/prisma";
import { AppProps } from "../components/App";
import usePages from "../hooks/usePages";
import renderPage from "../components/util/renderPage";
import { usePagesStateValue } from "../lib/builder";

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
    const pages = usePages();


    const currentPath = usePagesStateValue("path") ?? "/"


    let title = props.name;

    if (!props.published) {
        title = `${title} (Draft)`;
    }


    const findPage = () => {
        const currentPage = pages.find(page => page.path === currentPath)
        if (currentPage) {
            return currentPage
        }
        return pages[0]
    }


    return (
        <Box>
            {renderPage(findPage() ?? {})}
        </Box>
    );
};

export default App;
