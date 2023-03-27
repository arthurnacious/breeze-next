import React from "react";
import PropTypes from "prop-types";
import { Center, Loader, ScrollArea, Table } from "@mantine/core";
import { defaultProps } from "@mantine/dropzone/lib/Dropzone";

GeneralJournal.propTypes = {
  scrollAreaMaxHeight: PropTypes.string || PropTypes.number,
  scrollAreaType: PropTypes.string,
};

const headings = [
  "Date",
  "Account Title and Description",
  "Debit",
  "Credit",
  // "Reference",
];

GeneralJournal.defaultProps = {
  scrollAreaMaxHeight: "65vh",
  scrollAreaType: "auto",
};

function GeneralJournal({scrollAreaType, isLoading, children}) {
  
  if (isLoading) return <Center><Loader /></Center>

  return (
    <ScrollArea.Autosize
      // maxHeight={props.scrollAreaMaxHeight}
      type={scrollAreaType}
      offsetScrollbars
    >
      <Table withColumnBorders>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </ScrollArea.Autosize>
  );
}

export default GeneralJournal;
