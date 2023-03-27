import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/Layout/Main";
import PageContainer from "@/components/layout/PageContainer";
import FormError from "@/components/FormError"
import { Formik } from "formik";
import StringInput from "@/components/general/elements/Forms/StringInput";
import IntegerInput from "@/components/general/elements/Forms/IntegerInput";
import { SelectDataConverter } from "@/helpers/SelectHelper";
import { Button, Checkbox, Title } from "@mantine/core";
import SelectInput from "@/components/general/elements/Forms/SelectInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { showNotification } from "@mantine/notifications";
import { router } from "next/client";

Index.propTypes = {};

function Index(props) {
  
 const getFormData = () => {
  return axios
          .get('/api/statements/chart-of-accounts/create')
 }
  

  const {data : fomData, isError, isLoading} = useQuery(['statements','chart-of-accounts','create'], getFormData)
  
  const AccountGroupData = SelectDataConverter(
    fomData?.data?.account_group,
    "account_group_name"
  );

  const CurrencyGroupData = SelectDataConverter(
    fomData?.data?.currency,
    "currency_name"
  );
  
  const createNewChartOfAccount = useMutation(newChartOfAccount => {
    return axios
            .post('/api/statements/chart-of-accounts', newChartOfAccount)
  });
  

  if(createNewChartOfAccount.isSuccess){    
    showNotification({
        title: "Success",
        message: "Added Client",
    });
    router.push("/statements/chart-of-accounts");
  }

  return (
    <MainLayout title="New Charts of Accounts" >
      <PageContainer isLoading={isLoading}>
        <FormError error={createNewChartOfAccount?.error}/>
        <Formik
          initialValues={{
            account_name: "",
            account_number: 0,
            account_group: "1",
            statement_type: "",
            has_vat: true,
            currency: "1",
            entry_type: "2",
          }}
          onSubmit={(values, formikHelpers) => {
            createNewChartOfAccount.mutate({
              account_group: values.account_group,
              account_number: values.account_number,
              statement_type: values.statement_type,
              has_vat: values.has_vat,
              currency: values.currency,
              entry_type: values.entry_type,
              account_name: values.account_name,
            });
          }}
        >
          {(props) => (
            <>
              <Title order={3}>Add Chart of Accounts</Title>
              <form onSubmit={props.handleSubmit}>
                <StringInput
                  Label={"Account Name"}
                  Name={"account_name"}
                  Value={props.values.account_name}
                  onChange={props.handleChange}
                />
                <IntegerInput
                  Label={"Account Number"}
                  name={"account_number"}
                  value={props.values.account_number}
                  onChange={(e) => props.setFieldValue("account_number", e)}
                />
                <SelectInput
                  onChange={props.handleChange}
                  Label={"Account Group"}
                  Value={props.values.account_group}
                  Data={AccountGroupData}
                  Name={"account_group"}
                />
                <SelectInput
                  onChange={props.handleChange}
                  Label={"Currency"}
                  Value={props.values.currency}
                  Data={CurrencyGroupData}
                  Name={"currency"}
                />
                <SelectInput
                  onChange={props.handleChange}
                  Label={"Entry Type"}
                  Value={props.values.entry_type}
                  Data={[
                    { value: "1", label: "Debit" },
                    { value: "2", label: "Credit" },
                  ]}
                  Name={"entry_type"}
                />
                <StringInput
                  onChange={props.handleChange}
                  Label={"Statement Type"}
                  Name={"statement_type"}
                  Value={props.values.statement_type}
                />
                <Checkbox
                  label={"Has Vat"}
                  checked={props.values.has_vat}
                  name={"has_vat"}
                  onChange={props.handleChange}
                  style={{marginBottom: 20}}
                />

                <Button type={"submit"}>Create New Chart of Account</Button>
              </form>
            </>
          )}
        </Formik>
      </PageContainer>
    </MainLayout>
  );
}

export default Index;
