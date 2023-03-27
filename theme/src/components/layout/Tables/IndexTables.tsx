import React from "react";
import PropTypes from "prop-types";
import { Alert, Center, Loader, ScrollArea, Table } from "@mantine/core";

IndexTables.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.node,
  ScrollAreaMaxHeight: PropTypes.string || PropTypes.number,
  ScrollAreaType: PropTypes.string,
};

IndexTables.defaultProps = {
  scrollAreaMaxHeight: "65vh",
  scrollAreaType: "auto",
  isLoading: false,
};

function IndexTables(props) {
  if(props.isLoading){
    return  <Center><Loader /></Center>;
  }
  return (
    <ScrollArea.Autosize
      // maxHeight={props.scrollAreaMaxHeight}
      type={props.scrollAreaType}
      offsetScrollbars
    >
      {!props.isLoading && !props.rows ?      
        <Alert title="Bummer!" color="grape">
          No data loaded, please try again later
        </Alert>
        :
        <Table>
          <thead>
            <tr>
              {props.headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>{props.rows}</tbody>
        </Table>
      }
    </ScrollArea.Autosize>
  );
}

export default IndexTables;
