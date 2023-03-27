import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mantine/core";

ActionButton.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  color: PropTypes.string,
};

ActionButton.defaultProps = {
  variant: "outline",
  onClick: () => {},
  loading: false,
};

function ActionButton(props) {
  return (
    <Button
      leftIcon={props.icon ?? undefined}
      variant={props.variant}
      loading={props.loading}
      onClick={props.onClick}
      size={"xs"}
      color={props.color}
    >
      {props.label}
    </Button>
  );
}

export default ActionButton;
