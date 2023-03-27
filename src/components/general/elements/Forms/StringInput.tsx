import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "@mantine/core";

StringInput.propTypes = {
  Label: PropTypes.string.isRequired,
  Required: PropTypes.bool,
  Name: PropTypes.string.isRequired,
  Value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

StringInput.defaultProps = {
  Required: false,
};

function StringInput(props) {
  return (
    <TextInput
      label={props.Label}
      mt={10}
      mb={10}
      required={props.Required}
      withAsterisk={props.Required}
      name={props.Name}
      onChange={props.onChange}
      value={props.Value}
    />
  );
}

export default StringInput;
