import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import IndexCard from "@/components/layout/Cards/IndexCard";
import Ledger from "@/components/layout/Tables/Ledger";
import IndexTables from "@/components/layout/Tables/IndexTables";
import ButtonGroup from "@/components/layout/ButtonGroup";
import ActionButton from "@/components/general/elements/general/ActionButton";
import MainLayout from "@/components/layout/Layout/Main";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "@/lib/axios";

Index.propTypes = {};

function Index(props) {
  const router = useRouter();
  
  const getItems = () => {
    return axios
            .get('api/statements/general-ledgers')
  }
  
  const { data, error, isLoading } = useQuery(['statements', 'general-ledger'], getItems)

  const rows = data?.data?.map((row) => (
    <tr key={row.id}>
      <td>{row.chart_of_account?.account_number}</td>
      <td>{row.chart_of_account?.account_name}</td>
      <td>
        <ButtonGroup>
          <Link href={`general-ledger/entries/${row.chart_of_account?.account_number}`}>
            <ActionButton
              label={`View ${row.account_name}'s Ledgers`}
            />
          </Link>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <MainLayout>
      <PageContainer>
        <IndexCard title={"General Ledger Accounts"}>
          <IndexTables
            isLoading={isLoading}
            headings={["Account Number", "Account Name", "Actions"]}
            rows={rows}
          />
        </IndexCard>
      </PageContainer>
    </MainLayout>
  );
}

export default Index;
