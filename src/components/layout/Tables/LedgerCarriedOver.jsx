import React, { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import IndexCard from "@/components/layout/Cards/IndexCard";
import { DateRangePicker } from "@mantine/dates";
import { Button, Group, Title } from "@mantine/core";
import Ledger from "@/components/layout/Tables/Ledger";
import LedgerRow from "@/components/layout/Tables/Rows/LedgerRow";
import { useGetTransactionLinesByTransactionArgsQuery } from "@/graphql/generates";

LedgerCarriedOver.propTypes = {
  title: String,
  accountNumber: Number
};

function LedgerCarriedOver(props) {
  const [rangeValue, setRangeValue] = useState({});
  const [maySearch, setMaySearch] = useState(false);


  const search = e => {
    e.preventDefault();
    setMaySearch(true)
  }


  const { data, isSearching  } = useGetTransactionLinesByTransactionArgsQuery(client,
    {
      range: rangeValue,
      accountNumber: props.accountNumber
    },
    {
      enabled: maySearch
    }
  )

  console.log(maySearch);

  if (isSearching) {
    return <LoadingContainer />;
  }

  return (
    <>
      <PageContainer>
        <IndexCard title={`${props.title} Carrried over`}>
          <form onSubmit={e => search(e)}>
            <DateRangePicker
              withAsterisk
              label="Start and End Date"
              placeholder="Pick dates range"
              value={rangeValue}
              onChange={e => setRangeValue(e)}
            />

            <Group position="right" mt="md">
              <Button type="submit" loading={isSearching}>Submit</Button>
            </Group>
          </form>

          <ShowLedger visible={maySearch} ledgerData={data?.getTransactionLinesByTransactionArgs} />

        </IndexCard>
      </PageContainer>
    </>
  );
}

function ShowLedger({visible, ledgerData}){
  console.log(ledgerData)

  const rows = ledgerData?.map((entry) => (
    <LedgerRow
      key={entry.id}
      accountName={entry.chartOfAccount.account_name}
      creditAmount={entry.credit_amount}
      debitAmount={entry.debit_amount}
      date={entry.transaction.transaction_date}
    />
  ))

  if(visible){
    return rows ? <Ledger rows={rows} /> : <p>No Data between the provided range for this account </p>
  }

}

export default LedgerCarriedOver;
