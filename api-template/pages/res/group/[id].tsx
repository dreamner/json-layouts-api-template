import React from "react";
import { GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import prisma from "../../../lib/prisma";
import { AppProps } from "../../../components/App";
import Layout from "../../../components/Layout";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const resourceGroup = await prisma.resourceGroup.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            tables: {
                select: { name: true, rows: true, id: true, columns: true },
            },
            images: {
                select: { url: true, id: true }
            }
        },
    });
    return {
        props: resourceGroup,
    };
};

const App: React.FC<any> = (props) => {
    console.log(props)
    return (
        <Layout>
            <Typography variant="h4" >Resources</Typography>
        </Layout>
    );
};

export default App;
