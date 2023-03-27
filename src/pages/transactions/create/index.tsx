import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/Layout/Main";
import PageContainer from "@/components/layout/PageContainer";
import FormError from "@/components/FormError"
import {
  Button,
  CheckIcon,
  FileInput,
  Group,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { showNotification } from "@mantine/notifications";
import { DateInput, DatePicker } from "@mantine/dates";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

StockItems.propTypes = {};

function StockItems(props) {
  let router = useRouter();

  //Number of Transactions for procedural creation
  const [numberTransactions, setNumberTransactions] = useState(1);
  const [inputFields, setInputFields] = useState([]);
  const [documentUpload, setDocumentUpload] = useState<File | null>(null);

  // UseEffect to ensure that the number of transactions is always equal to the number of input fields
  useEffect(() => {
    setInputFields([]);
    const arr = [];
    for (let i = 0; i < numberTransactions; i++) {
      arr.push({
        debit_amount: null,
        credit_amount: null,
        chart_of_account_id: null,
      });
    }
    setInputFields([...arr]);
  }, [numberTransactions]);

  const getItems = () => {
    return axios
            .get('api/transactions/create')
  }
  
  const { data, error, isLoading } = useQuery(['transactions', 'create'], getItems)

  const createNewTransaction = useMutation(newTransaction => {
    return axios
            .post('/api/transactions', newTransaction)
  });

  console.log(createNewTransaction.data)

  if(createNewTransaction.isSuccess){    
    showNotification({
                color: "teal",
                icon: <CheckIcon />,
                title: "Success",
                message: "Transaction successfully created",
    });
    router.push("/transactions");
  }

  //Handle Input Change for the procedural fields
  const handleInputChange = (index, type, event) => {
    const values = [...inputFields];
    values[index][type] = event;
    setInputFields(values);
  };

  return (
    <MainLayout title="Create New Transaction">
        <PageContainer isLoading={isLoading}>
            <Title order={1}>New Transaction</Title>
            <FormError error={createNewTransaction?.error}/>
            {/*This is the formik form component*/}
            <Formik
                initialValues={{
                Document_type: 1,
                document_date: "",
                document_upload: "",
                description: "",
                document_comments: "",
                transaction_code: "",
                transaction_date: "",
                transaction_description: "",
                transaction_document: "",
                debit_amount: [],
                credit_amount: [],
                chart_of_account_id: [],
                }}
                onSubmit={(values, actions) => {
                createNewTransaction.mutate({
                    document_type: values.document_type,
                    document_date: values.document_date,
                    document_upload: values.document_upload,
                    description: values.description,
                    document_comments: values.document_comments,
                    transaction_code: values.transaction_code,
                    transaction_date: values.transaction_date,
                    transaction_description: values.transaction_description,
                    transaction_document: values.transaction_document,
                    debit_amount: inputFields.map((value) => value.debit_amount),
                    credit_amount: inputFields.map((value) => value.credit_amount),
                    chart_of_account_id: inputFields.map(
                        (value) => value.chart_of_account_id
                    ),
                });
                }}
            >
                {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <NativeSelect
                        label={"Document Type"}
                        mb={10}
                        data={[
                            { label: "Invoice", value: "1" },
                            { label: "Receipt", value: "2" },
                            { label: "Payment", value: "3" },
                            { label: "Credit Note", value: "4" },
                            { label: "Debit Note", value: "5" },
                        ]}
                        onChange={props.handleChange}
                        value={props.values.document_type}
                        name={"document_type"}
                    />
                    <DateInput
                        label={"Document Date"}
                        onChange={(e) => props.setFieldValue("document_date", e)}
                        value={new Date(Date.now())}
                        name={"document_date"}
                        required
                        mb={10}
                        radius={"sm"}
                    />
                    <FileInput
                        label={"Document Upload"}
                        onChange={(e) => setDocumentUpload(e)}
                        value={null}
                        name={"document_upload"}
                        placeholder="Pick file"
                        mb={10}
                        accept="image/*,application/pdf,application/vnd.ms-excel"
                        radius={"sm"}
                    />
                    <Textarea
                        label={"Description"}
                        onChange={(e) =>
                            props.setFieldValue("description", e.target.value)
                        }
                        value={props.values.description}
                        name={"description"}
                        withAsterisk
                        required
                        mb={10}
                        radius={"sm"}
                    />
                    <Textarea
                        label={"Document Comments"}
                        onChange={(e) =>
                            props.setFieldValue("document_comments", e.target.value)
                        }
                        value={props.values.document_comments}
                        name={"transaction_description"}
                        withAsterisk
                        required
                        mb={10}
                        radius={"sm"}
                    />
                    <TextInput
                        label={"Transaction Code"}
                        onChange={(e) =>
                            props.setFieldValue("transaction_code", e.target.value)
                        }
                        value={props.values.transaction_code}
                        name={"transaction_code"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"DLH-555-05LC"}
                        radius={"sm"}
                    />
                    <DateInput
                        label={"Transaction Date"}
                        onChange={(e) => props.setFieldValue("transaction_date", e)}
                        value={props.values.transaction_date}
                        name={"transaction_date"}
                        value={new Date(Date.now())}
                        required
                        mb={10}
                        radius={"sm"}
                    />
                    <Textarea
                        label={"Transaction Description"}
                        onChange={(e) =>
                            props.setFieldValue("transaction_description", e.target.value)
                        }
                        value={props.values.transaction_description}
                        name={"transaction_description"}
                        withAsterisk
                        required
                        mb={10}
                        radius={"sm"}
                    />

                    <Title order={3}>Transactions </Title>
                    <NumberInput
                        label={"How many Transactions do you want to add?"}
                        value={numberTransactions}
                        onChange={(e) => setNumberTransactions(e)}
                        name={"transactions"}
                        mb={10}
                        radius={"sm"}
                    />

                    {/*Procedural fields map function*/}
                    {inputFields.map((input, index) => (
                    <Group position="apart" key={index}>
                        <Title order={6}>Transaction {index + 1}</Title>
                        <NumberInput
                            label={"Debit Amount"}
                            onChange={(e) => handleInputChange(index, "debit_amount", e)}
                            value={inputFields[index]["debit_amount"] ?? 0}
                            name={"debit_amount"}
                            mb={10}
                            radius={"sm"}
                        />
                        <NumberInput
                            label={"Credit Amount"}
                            onChange={(e) => handleInputChange(index, "credit_amount", e)}
                            value={inputFields[index]["credit_amount"] ?? 0}
                            name={"credit_amount"}
                            mb={10}
                            radius={"sm"}
                        />
                        <NativeSelect
                            data={data?.data?.chart_of_account?.map(
                                ({ id, account_name }) => ({
                                value: id,
                                label: account_name,
                                })
                            )}
                            label="Chart o Account"
                            onChange={(e) =>
                                handleInputChange(
                                index,
                                "chart_of_account_id",
                                e.target.value
                                )
                            }
                            value={inputFields[index]["chart_of_account_id"] ?? ""}
                            mb={10}
                            required
                            withAsterisk
                        />
                    </Group>
                    ))}
                    <Button type={"submit"} loading={createNewTransaction.isLoading}>
                        Submit
                    </Button>
                </form>
                )}
            </Formik>
        </PageContainer>
    </MainLayout>
  );
}

export default StockItems;
