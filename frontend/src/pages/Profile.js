import React from "react";
import Header from "../Components/Header";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

const Profile = () => {
  let { userId } = useParams();
  return (
    <div>
      <Header pageTitle={userId} />
      <Typography>Profile page</Typography>
    </div>
  );
};

export default Profile;
