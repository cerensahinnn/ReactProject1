import { useRoutes } from "react-router-dom";
import React from "react";
import Content from "./Content";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Content />,
      index: true,
    },
  ]);

  return routes;
}
