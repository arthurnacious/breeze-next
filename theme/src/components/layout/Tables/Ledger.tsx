import React from "react";
import PropTypes from "prop-types";
import { Table } from "@mantine/core";

Ledger.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  rows: PropTypes.node.isRequired,
};

Ledger.defaultProps = {
  headings: [
    "Date",
    "Account Name",
    "Debit Amount",
    "",
    "Date",
    "Account Name",
    "Credit Amount",
  ],
};
function Ledger({ headings, title, rows }) {
  return (
    <Table verticalSpacing={"md"} withBorder withColumnBorders>
      <caption>{title}</caption>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Ledger;
