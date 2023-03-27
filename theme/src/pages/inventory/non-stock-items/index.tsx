import React from "react";
import MainLayout from "@/components/layout/Layout/Main";
import IndexCard from "@/components/layout/Cards/IndexCard";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import DataTable from "@/components/layout/Tables/DataTable";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

NonstockItems.propTypes = {};

function NonstockItems(props) {
  let router = useRouter();

  const getItems = () => {
    return axios
      .get('api/inventory/non_stock')
  }
  
  const { data, error, isFetching } = useQuery(['inventory', 'nonStock'], getItems)
  
  const defaultColProps = {
    sortable: true,
    autoHeight: true,
  };

  const columns = [
    {
      field: "item_code",
      headerName: "Item Code",
      width: 150,
    },
    {
      field: "short_description",
      headerName: "Short Description",
      sortable: false,
      width: 250,
    },
    {
      field: "non_stock_item.quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "purchase_date",
      headerName: "Date of Purchase",
      width: 150,
    },
    {
      field: "cost_value",
      headerName: "Cost Value",
      width: 150,
    },
  ];

  return (
    <MainLayout title="Non Stock Items" >

      <PageContainer>
        <Button
            color="teal"
            style={{ margin: "20px 0" }}
          >
            <Link href="/inventory/create">
              Add New
            </Link>
        </Button>
        <IndexCard title={"Non Stock Items"}>
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
