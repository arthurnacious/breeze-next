import React from "react";
import PropTypes from "prop-types";
import { Button, Group } from "@mantine/core";

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

function ButtonGroup({ children }) {
  return <Group spacing={"sm"}>{children}</Group>;
}

export default ButtonGroup;
