import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import IndexCard from "@/components/layout/Cards/IndexCard";
import MainLayout from "@/components/layout/Layout/Main";
import GeneralJournal from "@/components/layout/Tables/GeneralJournal";
import { Button, Text, Title } from "@mantine/core";
import { ExportToExcel } from "@/lib/ExportToExcel";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

Index.propTypes = {};

function Index(props) {
  const getItems = () => {
    return axios
            .get('api/statements/general-journals')
  }
  
  const { data, error, isLoading } = useQuery(['statements', 'general-journal'], getItems)

  const rows = data?.data?.map((entry, index) => {
    const transaction = entry.transaction;
    return (
      <React.Fragment key={`transaction-${index}`}>
        <tr>
            <td colSpan={4}><span style={{fontWeight: 700}}>REFERENCE</span> : {transaction.transaction_code}</td>
        </tr>
        {transaction?.transaction_lines?.map((line) => (
          <tr key={`line-${line.id}`}>
            <td>{transaction.transaction_date}</td>
            <td>{line.chart_of_account?.account_name}</td>
            <td>{line.debit_amount}</td>
            <td>{line.credit_amount}</td>
            {/* <td>
              <Text tt={"uppercase"}>{transaction.transaction_code}</Text>
            </td> */}
          </tr>
        ))}
      </React.Fragment>
    )
  });

  const ExcelGeneralJournal = data?.data?.map(
    (entry) => {
      let Alltransactions = [];
      entry?.transactionLines?.map((line) => {
        Alltransactions.push({
          "Transaction Date": line.transaction.transaction_date,
          "Account Name": line.chartOfAccount.account_name,
          "Debit Amount": line.debit_amount,
          "Credit Amount": line.credit_amount,
          "Reference Number": line.transaction.transaction_code,
        });
      });
    }
  );


  return (
    <MainLayout>
      <PageContainer>
        <Button
          onClick={(e) =>
            ExportToExcel(ExcelGeneralJournal, "General Journal", "Data")
          }
        >
          Export
        </Button>
        <IndexCard title={"General Journal"}>
          <GeneralJournal isLoading={isLoading}>{rows}</GeneralJournal>
        </IndexCard>
      </PageContainer>
    </MainLayout>
  );
}

export default Index;
