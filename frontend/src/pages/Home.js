import React from "react";
import Header from "../Components/Header";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <div>
      <Header pageTitle={"Home"} />
      <Typography>Home Page</Typography>
    </div>
  );
};

export default Home;
