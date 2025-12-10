import { Typography } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <>
      <Typography variant="h1" component="h1">  hello  </Typography>
      <Typography variant="body" component="p"> hello22222</Typography>
      <Typography sx={{backgroundColor:"red"}}> hello3333 </Typography>
      <Typography bgcolor={'blue'}>  hello444444</Typography>
    </>
  );
}
