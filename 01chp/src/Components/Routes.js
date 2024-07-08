import { useRoutes } from "react-router-dom";
import React from "react";

import Content from "./Content";
import Login from "./Login";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      path: "/Content",
      element: <Content />,
    },
  ]);

  return routes;
}
