import React from "react";
import { AgGridReact } from "ag-grid-react";
import {Alert, Center, Loader, ScrollArea} from "@mantine/core";
import PropTypes from "prop-types";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

DataTable.propTypes = {
  ScrollAreaMaxHeight: PropTypes.string || PropTypes.number,
  ScrollAreaType: PropTypes.string,
  Theme: PropTypes.string,
  DomLayout: PropTypes.string,
  DefaultColDef: PropTypes.object,
  Columns: PropTypes.array.isRequired,
  Rows: PropTypes.array
};

DataTable.defaultProps = {
  scrollAreaMaxHeight: "65vh",
  scrollAreaType: "auto",
  isLoading: false,
  theme: "ag-theme-material",
  domLayout: "autoHeight"
}

function DataTable(props){

  if(props.isLoading) return <Center><Loader /></Center>

  return(
    <ScrollArea.Autosize
      // maxHeight={props.scrollAreaMaxHeight}
      type={props.scrollAreaType}
      offsetScrollbars
    >
      {!props.Rows ?
        <Alert title="Bummer!" color="grape">
          No data loaded, please try again later
        </Alert>
      :
        <div className={props.theme}>
          <AgGridReact
            domLayout={props.domLayout}
            defaultColDef={props.DefaultColDef}
            columnDefs={props.Columns}
            rowData={props.Rows}
          >
          </AgGridReact>
        </div>
    }
    </ScrollArea.Autosize>
  );
}
export default DataTable;