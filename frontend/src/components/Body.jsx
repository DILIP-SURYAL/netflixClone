import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Body = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return <div>Body</div>;
};

export default Body;
