import React from "react";
import PropTypes from "prop-types";
import { NativeSelect } from "@mantine/core";

SelectInput.propTypes = {
  Data: PropTypes.arrayOf(Object).isRequired,
  Label: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  Value: PropTypes.string.isRequired || PropTypes.number.isRequired,
  Required: PropTypes.bool.isRequired,
};

SelectInput.defaultProps = {
  Required: false,
};

function SelectInput(props) {
  return (
    <div>
      <NativeSelect
        mt={10}
        mb={10}
        label={props.Label}
        name={props.Name}
        onChange={props.onChange}
        value={props.Value}
        data={props.Data}
        required={props.Required}
        withAsterisk={props.Required}
      />
    </div>
  );
}

export default SelectInput;
