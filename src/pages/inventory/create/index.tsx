import React, { useEffect, useState } from "react";
import FormError from "@/components/FormError"
import {
  Box,
  Button,
  Container,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import MainLayout from "@/components/layout/Layout/Main";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { DateInput } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { showNotification } from "@mantine/notifications";

export default function create() {
  const router = useRouter();

  const createNewInventory = useMutation(newInventory => {
    return axios
            .post('/api/inventory/', newInventory)
  });

  if(createNewInventory.isSuccess){    
    showNotification({
        title: "Success",
        message: "Added Inventory Item",
    });
    router.push("/inventory");
  }

  return (
    <MainLayout title="New Inventory" >
        <Container pt={"lg"} p={"sm"}>
            <Box mb={"50px"}>
                <Title order={1}>New Inventory</Title>
                <FormError error={createNewInventory.error}/>
                <Formik
                initialValues={{
                    stock_type: "1",
                    item_code: "",
                    short_description: "",
                    long_description: "",
                    cost_value: 0,
                    quantity: 0,
                    purchase_date: new Date()
                }}
                onSubmit={(values, actions) => {
                    const purchase_date = new Date(values.purchase_date).toISOString();
                    createNewInventory.mutate({
                        stock_type: values.stock_type,
                        item_code: values.item_code,
                        short_description: values.short_description,
                        long_description: values.long_description,
                        cost_value: values.cost_value,
                        quantity: values.quantity,
                        purchase_date: purchase_date,
                    });

                }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <NativeSelect
                            label={"Stock Type"}
                            mb={10}
                            data={[
                            { label: "Stock Item", value: "1" },
                            { label: "Non-Stock Item", value: "2" },
                            { label: "Service Rendered", value: "3" },
                            ]}
                            onChange={(e) => props.setFieldValue("stock_type", e.currentTarget.value)}
                            value={props.values.stock_type}
                            name={"stockType"}
                        />
                        <TextInput
                            label={"Item Code"}
                            onChange={(e) => props.setFieldValue("item_code", e.target.value)}
                            value={props.values.item_code}
                            name={"item_code"}
                            withAsterisk
                            required
                            mb={10}
                            placeholder={"0"}
                            radius={"sm"}
                        />
                        <Textarea
                            label={"Short Description"}
                            name={"short_description"}
                            required
                            mb={10}
                            onChange={props.handleChange}
                            value={props.values.short_description}
                        />
                        <Textarea
                            label={"Long Description"}
                            name={"long_description"}
                            required
                            mb={10}
                            onChange={props.handleChange}
                            value={props.values.long_description}
                        />
                        <TextInput
                            label={"Cost value"}
                            onChange={(e) => props.setFieldValue("cost_value", e.target.value)}
                            required
                            mb={10}
                            value={props.values.cost_value}
                            name={"cost_value"}
                        />
                        {props.values.stock_type !== "3" &&
                            <NumberInput
                                label={"quantity"}
                                onChange={(e) => props.setFieldValue("quantity", e)}
                                required
                                mb={10}
                                value={props.values.quantity}
                                name={"quantity"}
                            />
                        }                      
                        <DateInput
                            label={"Purchase Date"}
                            onChange={(e) => props.setFieldValue("purchase_date", e)}
                            required
                            mb={10}
                            value={new Date(props.values.purchase_date)}
                            name={"purchase_date"}
                        />
                        
                        <Button type={"submit"} loading={createNewInventory.isLoading}>Insert</Button>
                    </form>
                )}
                </Formik>
            </Box>
        </Container>
    </MainLayout>
  );
}
