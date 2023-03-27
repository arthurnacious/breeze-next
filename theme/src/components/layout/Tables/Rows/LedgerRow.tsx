import React from "react";
import PropTypes from "prop-types";

LedgerRow.propTypes = {
  date: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  debitAmount: PropTypes.number.isRequired,
  creditAmount: PropTypes.number.isRequired,
};

function LedgerRow(props) {
  return (
    <tr>
      <td>{props.debitAmount > 0 && props.date}</td>
      <td>{props.debitAmount > 0 && props.accountName}</td>
      <td>{props.debitAmount > 0 && `R ${props.debitAmount}`}</td>
      <td></td>
      <td>{props.creditAmount > 0 && props.date}</td>
      <td>{props.creditAmount > 0 && props.accountName}</td>
      <td>{props.creditAmount > 0 && `R ${props.creditAmount}`}</td>
    </tr>
  );
}

export default LedgerRow;
