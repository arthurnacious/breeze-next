import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import IndexTables from "@/components/layout/Tables/IndexTables";
import IndexCard from "@/components/layout/Cards/IndexCard";
import MainLayout from "@/components/layout/Layout/Main";
import { depreciation, depreciationPerAnnum } from "@/lib/formulas";
import { Button, Modal } from "@mantine/core";
import { ExportToExcel } from "@/lib/ExportToExcel";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

Index.propTypes = {};

function Index(props) {
  
  const [opened, { open, close }] = useDisclosure(false);
  const [register, setRegister] = useState({})

  const getItems = () => {
    return axios
            .get('api/statements/fixed-asset-registers')
  }
  
  const { data, error, isLoading } = useQuery(['statements', 'fixed-asset-register'], getItems)

  const doTheRegister = (cur: Object) => {
    setRegister(cur)
    open(true)
  }

  const ExcelFixedAssetRegistry = data?.data?.map((entry) => ({
    "Model Number": entry.model_number,
    "Serial Number": entry.serial_number,
    Description: entry.item_description,
    Category: entry.category,
    "Purchase Date": entry.purchase_date,
    "Cost Value": entry.cost_value,
    "Residual Value": entry.residual_value,
    "Useful Life": entry.useful_life,
    "Depreciation per annum": depreciationPerAnnum(
      entry.cost_value,
      entry.residual_value,
      entry.useful_life
    ),
    "Accumulated Depreciation": depreciation(
      entry.cost_value,
      entry.residual_value,
      entry.useful_life,
      entry.purchase_date
    ),
  }));

  const rows = data?.data?.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.model_number}</td>
      <td>{entry.serial_number}</td>
      <td>{entry.category}</td>
      <td>{entry.purchase_date}</td>
      <td>{entry.cost_value}</td>
      <td>{entry.residual_value}</td>
      <td>{entry.useful_life}</td>
      <td>
        {depreciationPerAnnum(
          entry.cost_value,
          entry.residual_value,
          entry.useful_life
        )}
      </td>
      <td>
        {depreciation(
          entry.cost_value,
          entry.residual_value,
          entry.useful_life,
          entry.purchase_date
        )}
      </td>
      <td>
        <Button onClick={() => doTheRegister(entry)}>Quick View</Button>
      </td>
    </tr>
  ));

  return (
    <MainLayout>
      <PageContainer>
        <Button
          onClick={() =>
            ExportToExcel(ExcelFixedAssetRegistry, "Fixed Asset Registry", "Data")
          }
        >
          Export
        </Button>
        <IndexCard title={"Fixed Asset Registry"}>
          <IndexTables
            isLoading={isLoading}
            headings={[
              "Model Number",
              "Serial Number",
              "Category",
              "Purchase Date",
              "Cost Value",
              "Residual Value",
              "Useful Life",
              "Depreciation per annum",
              "Accumulated Depreciation",
              "Action"
            ]}
            rows={rows}
          />
        </IndexCard>
        <Modal opened={opened} onClose={close} title="View Fixed Asset Register">
          {register.item_description}
        </Modal>
      </PageContainer>
    </MainLayout>
  );
}

export default Index;
