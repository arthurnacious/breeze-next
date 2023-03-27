import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  useByAccountQuery,
  useChartOfAccountByNameQuery,
} from "@/graphql/generates";
import { client } from "@/libs/graphQLClient";
import { Button } from "@mantine/core";
import PageContainer from "@/components/layout/PageContainer";
import IndexCard from "@/components/layout/Cards/IndexCard";
import LoadingContainer from "@/components/general/containers/LoadingContainer";
import Ledger from "@/components/layout/Tables/Ledger";
import LedgerRow from "@/components/layout/Tables/Rows/LedgerRow";
import LedgerCarriedOver from "@/components/layout/Tables/LedgerCarriedOver";
import { ExportToExcel } from "@/libs/ExportToExcel";

AccountName.propTypes = {};

function AccountName(props) {
  const [carrriedOver, setCarriedOver] = useState(false);
  const router = useRouter();
  const { account_number } = router.query;
  // @ts-ignore
  const number = parseInt(account_number);
  const { data: accountData, isLoading: accountLoading } =
    useChartOfAccountByNameQuery(client, {
      accountNumber: number,
    });

  const { data: ledgerData, isLoading: ledgerLoading } = useByAccountQuery(
    client,
    { accountNumber: accountData?.getChartOfAccount?.id },
    {
      enabled: !!accountData?.getChartOfAccount?.id, // only run if accountData is defined
    }
  );

  const ExcelLedger = ledgerData?.getByChartOfAccount.map((entry) => ({
    "Debit Date":
      entry.debit_amount > 0 ? entry.transaction.transaction_date : "",
    "Debit Account Name":
      entry.debit_amount > 0 ? entry.chartOfAccount.account_name : "",
    "Debit Amount": entry.debit_amount > 0 ? `R ${entry.debit_amount}` : "",
    "": "",
    "Credit Date":
      entry.credit_amount > 0 ? entry.transaction.transaction_date : "",
    "Credit Account Name":
      entry.credit_amount > 0 ? entry.chartOfAccount.account_name : "",

    "Credit Amount": entry.credit_amount > 0 ? `R ${entry.credit_amount}` : "",
  }));

  if (ledgerLoading || accountLoading) {
    return <LoadingContainer />;
  }

  const rows = ledgerData?.getByChartOfAccount?.map((entry) => (
    <LedgerRow
      key={entry.id}
      accountName={entry.chartOfAccount.account_name}
      creditAmount={entry.credit_amount}
      debitAmount={entry.debit_amount}
      date={entry.transaction.transaction_date}
    />
  ));

  return (
    <PageContainer>
      <Button onClick={(e) => setCarriedOver((prev) => !prev)}>
        {carrriedOver ? "Carried Over" : "Ledger"}
      </Button>
      {carrriedOver ? (
        <Button
          mx={20}
          onClick={() =>
            ExportToExcel(
              ExcelLedger,
              `Ledger For ${accountData?.getChartOfAccount.account_name}`,
              "Data"
            )
          }
        >
          Export
        </Button>
      ) : null}
      {carrriedOver ? (
        <IndexCard
          title={`Ledger for ${accountData?.getChartOfAccount?.account_name} `}
        >
          <Ledger
            rows={rows}
            accountNumber={accountData?.getChartOfAccount?.id}
          />
        </IndexCard>
      ) : (
        <LedgerCarriedOver
          title={accountData?.getChartOfAccount?.account_name}
        />
      )}
    </PageContainer>
  );
}

export default AccountName;
