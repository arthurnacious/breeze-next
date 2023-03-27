import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import PropTypes from 'prop-types';
import React from 'react';



function ErrorAlert({ errors }) {
  const renderErrors = (error) => {
    const subErrors = error.extensions.validation;
    return Object.entries(subErrors).map(([key, value]) => (
      <li key={key}>{value}</li>
    ));
  };

  return errors?.length > 0 ?? (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title="Oopsy!"
      color="red"
    >
      {errors.map((error, index) => (
        <ul type="1" key={index}>
          {renderErrors(error)}
        </ul>
      ))}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
};

export default ErrorAlert;