import React from "react";
import PropTypes from "prop-types";

JournalEntry.propTypes = {
  date: PropTypes.string.isRequired,
  transactionLines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function JournalEntry(props) {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.description}</td>
    </tr>
  );
}

export default JournalEntry;
