import React from "react";
import { Grid } from "@mui/material";
import renderComponents from "./renderComponents";

export default function renderGrid({ components = [], spacing = 2 }: any) {
 
  console.log(components)
  const children = components.map((gridItem: any) =>
    renderComponents(gridItem)
  );
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
}