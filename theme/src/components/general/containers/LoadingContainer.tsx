import { Flex, Loader } from "@mantine/core";
import React from "react";
//Used for when a full page loading screen is needed

function LoadingContainer(props) {
  return (
    <Flex justify={"center"} align={"center"} style={{ height: "100vh" }}>
      <Loader variant={"dots"} size={80} />
    </Flex>
  );
}

export default LoadingContainer;
