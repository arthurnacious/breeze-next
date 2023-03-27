import React from "react";
import PropTypes from "prop-types";
import { Button, Card, ScrollArea, Table, Title } from "@mantine/core";
import { FaEye } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";

IndexCard.propTypes = {
  title: PropTypes.string.isRequired,
  shadow: PropTypes.string,
  mt: PropTypes.string,
  p: PropTypes.string,
  radius: PropTypes.string,
  withBorder: PropTypes.bool,
  children: PropTypes.node,
};

IndexCard.defaultProps = {
  shadow: "sm",
  mt: "lg",
  p: "lg",
  radius: "md",
  withBorder: true,
};

function IndexCard({ title, shadow, mt, p, radius, withBorder, children }) {
  return (
    <Card
      shadow={shadow}
      mt={mt}
      p={p}
      radius={radius}
      withBorder={withBorder}
      style={{ overflow: "visible" }}
    >
      <Card.Section withBorder>
        <Title tt={"capitalize"} align={"center"}>
          {title}
        </Title>
      </Card.Section>
      {children}
    </Card>
  );
}

export default IndexCard;
