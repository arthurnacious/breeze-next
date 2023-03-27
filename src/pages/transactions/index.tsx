import React from "react";
import ActionsCellReverse from "@/components/layout/Tables/ActionsCellReverse";
import MainLayout from "@/components/layout/Layout/Main";
import PageContainer from "@/components/layout/PageContainer";
import IndexCard from "@/components/layout/Cards/IndexCard";
import DataTable from "@/components/layout/Tables/DataTable";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import Link from "next/link";

StockItems.propTypes = {};

function StockItems(props) {
  let router = useRouter()
  
  const getItems = () => {
    return axios
            .get('api/transactions')
  }
  
  const { data, error, isLoading } = useQuery(['transactions'], getItems)

  const defaultColProps = {
    sortable: true,
    autoHeight: true
  } 

const reverseTransaction = useMutation(transaction => {
  return axios
          .delete(`/api/transactions/${transaction}`)
})

console.log(reverseTransaction.data?.data)
  
  if(reverseTransaction.isSuccess){
      onSuccess: (data, variables, context) => {
        showNotification({
          title: "Success",
          message: "Transaction successfully reversed",
        });
        router.push("/transactions");
      }
    };

  const viewTransaction = (transactionId: string) => {
    router.push(`/transactions/view/${transactionId}`)
  }

  const columns = [
    {
      field: "transaction_code",
      headerName: "Transaction Code",
      width: 200
    },
    {
      field: "transaction_description",
      headerName: "Description",
      sortable: false,
      width: 350
    },
    {
      field: "transaction_date",
      headerName: "Transaction Date",
      width: 150
    },    
    {
      headerName: "Actions",
      cellRenderer: ActionsCellReverse,
      cellRendererParams: {
        onReverse: reverseTransaction.mutate,
        onView: viewTransaction
      },
      width: 150,
      sortable: false,
      filter: false,
    },
  ]

  return (
    <MainLayout>
        <PageContainer>
        <Link href={`/transactions/create`}>   
          <Button color="teal" style={{ margin: '20px 0'}}>
              Add New
          </Button>
        </Link>
        <IndexCard title={"Transactions"}>
            <DataTable
            isLoading={isLoading}
            DefaultColDef={defaultColProps}
            Columns={columns}
            Rows={data?.data}
            />
        </IndexCard>
        </PageContainer>
    </MainLayout>
  );
}

export default StockItems;
