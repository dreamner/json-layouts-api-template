import React from "react";
import Dashboard from "../layouts/dashboard";
import DefaultLayout from "../layouts/defaultlayout";
import renderBox from "./renderBox";

import renderComponents from "./renderComponents";
import renderGrid from "./renderGrid";
import renderStack from "./renderStack";

interface Ipage {
  layout: string;
  name: string;
  opts: any;
  components: any[];
}

const defaultPageProps = { layout: "", name: "Page", components: [], opts: {} };

export default function renderPage(page: Ipage = defaultPageProps) {
  const { layout, components, name, opts } = page;

  const children = renderStack(renderComponents(components));

  switch (layout) {
    case "page": {
      return (
        <React.Suspense fallback={<>Loading page...</>}>
          {children}
        </React.Suspense>
      );
    }
    case "dashboard": {
      const drawerLists = (opts as any)?.lists ?? [];
      return <Dashboard drawer={renderBox(drawerLists)}>{children}</Dashboard>;
    }
    default: {
      return <DefaultLayout name={name}>{children}</DefaultLayout>;
    }
  }
}
