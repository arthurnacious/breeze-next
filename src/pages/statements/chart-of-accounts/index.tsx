import React from "react";
import { Box, Breadcrumbs, Button, LoadingOverlay } from "@mantine/core";
import PageContainer from "@/components/layout/PageContainer";
import { breadcrumberfy } from "@/helpers";
import IndexCard from "@/components/layout/Cards/IndexCard";
import entryType, { entryTypeToString } from "@/lib/entryTypeDecipher";
import { useRouter } from "next/router";
import DataTable from "@/components/layout/Tables/DataTable";
import { ExportToExcel } from "@/lib/ExportToExcel";
import MainLayout from "@/components/layout/Layout/Main";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

Index.propTypes = {};

function Index(props) {
  const crumbs = breadcrumberfy([
    { title: "Statements" },
    { title: "Chart of Accounts" },
  ]);

  const getItems = () => {
    return axios
            .get('api/statements/chart-of-accounts')
  }
  
  const { data, error, isLoading } = useQuery(['clients'], getItems)

  const defaultColProps = {
    sortable: true,
    autoHeight: true,
  };

  
const doTheBoolean = ({value}) => {
  console.log(value)
  return value ? "Yes" : "No";
}

  const columns = [
    {
      field: "account_number",
      headerName: "Account Number",
      width: 150,
    },
    {
      field: "account_name",
      headerName: "Account Name",
      sortable: false,
      width: 250,
    },
    {
      field: "statement_type",
      headerName: "Statement Type",
      width: 150,
    },
    {
      field: "account_group.account_group_name",
      headerName: "Account Group Name",
      width: 150,
    },
    {
      field: "entry_type.entry_type",
      headerName: "Entry Type",
      valueFormatter: entryType,
    },
    {
      field: "has_vat",
      headerName: "Has Vat",
      valueFormatter: doTheBoolean,
    },
  ];

  const router = useRouter();

  const excelChartOfAccounts: Array<object> = data?.data?.map(
    (item) => ({
      "Account Number": item.account_number,
      "Account Name": item.account_name,
      "Account Group Name": item.account_group.account_group_name,
      "Statement Type": item.statement_type,
      "Entry Type": entryTypeToString(item.entry_type.entry_type),
    })
  );

  return (
    <MainLayout>
      <PageContainer>
        <Breadcrumbs separator={"→"}>{crumbs}</Breadcrumbs>

        <LoadingOverlay visible={isLoading} overlayBlur={3} />
        <Box my={30}>
          <Button
            color="teal"
            style={{ margin: "20px 0" }}
          >
            <Link href="/statements/chart-of-accounts/create">
              Add New
            </Link>
        </Button>
          <Button
            mx={20}
            onClick={() =>
              ExportToExcel(
                excelChartOfAccounts,
                `Chart Of Accounts for Year`,
                "Chart Of Accounts"
              )
            }
          >
            Export
          </Button>
          <IndexCard title={"Chart of Accounts"}>
            <DataTable
              isLoading={isLoading}
              DefaultColDef={defaultColProps}
              Columns={columns}
              Rows={data?.data}
            />
          </IndexCard>
        </Box>
      </PageContainer>
    </MainLayout>
  );
}

export default Index;
