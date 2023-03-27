import React from "react";
import PropTypes from "prop-types";
import { NumberInput } from "@mantine/core";

IntegerInput.propTypes = {
  Label: PropTypes.string.isRequired,
  Required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

IntegerInput.defaultProps = {
  Required: false,
};

function IntegerInput(props) {
  return (
    <div>
      <NumberInput
        label={props.Label}
        onChange={props.onChange}
        value={props.Value}
        name={props.Name}
        withAsterisk={props.Required}
        required={props.Required}
        defaultValue={0}
        mt={10}
        mb={10}
      />
    </div>
  );
}

export default IntegerInput;
