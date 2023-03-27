import React from "react";
import IndexCard from "@/components/layout/Cards/IndexCard";
import ActionsCellRenderer, {
  ActionsCellClients,
} from "@/components/layout/Tables/ActionsCellReverse";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/Layout/Main";
import DataTable from "@/components/layout/Tables/DataTable";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@mantine/core";
import Link from "next/link";

NonstockItems.propTypes = {};

function NonstockItems() {
  let router = useRouter();

  const getItems = () => {
    return axios
      .get('api/clients')
  }
  
  const { data, error, isFetching } = useQuery(['clients'], getItems)
  
  const defaultColProps = {
    sortable: true,
    autoHeight: true,
  };

  const columns = [
    {
      field: "user.first_name",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "user.last_name",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "vat_number",
      headerName: "Vat Number",
      sortable: false,
      width: 200,
    },
    {
      field: "identity_number",
      headerName: "Identity Number",
      width: 200,
    },
    {
      headerName: "Actions",
      cellRenderer: ActionsCellClients,
      width: 150,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <MainLayout title="Clients">

      <PageContainer>
        <Button
            color="teal"
            style={{ margin: "20px 0" }}
          >
            <Link href="/clients/create">
              Add New
            </Link>
        </Button>
        <IndexCard title={"clients"}>
            <DataTable
              isLoading={isFetching}
              DefaultColDef={defaultColProps}
              Columns={columns}
              Rows={data?.data}
            />
        </IndexCard>
        </PageContainer>
    </MainLayout>
  );
}

export default NonstockItems;
