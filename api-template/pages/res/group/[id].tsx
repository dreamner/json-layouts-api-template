import React from "react";
import { Container, Typography } from "@mui/material";
import Layout from "../../../components/Layout";
import ResourceTabs from "../../../components/ResourceTabs";
import useResourceGroups from "../../../hooks/useResourceGroups";

const App: React.FC = () => {
  const props = useResourceGroups();
  return (
    <Layout>
      <Container>
        <Typography variant="h4">Resources</Typography>
        <ResourceTabs resourceGroup={{ ...props }} />
      </Container>
    </Layout>
  );
};

export default App;
