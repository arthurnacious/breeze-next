import React from "react";
import FormError from "@/components/FormError"
import {
  Box,
  Button,
  Container,
  TextInput,
  Title,
} from "@mantine/core";
import MainLayout from "@/components/layout/Layout/Main";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { showNotification } from "@mantine/notifications";

export default function create() {
  const router = useRouter();

  const createNewClient = useMutation(newClient => {
    return axios
            .post('/api/clients', newClient)
  });

  

  if(createNewClient.isSuccess){    
    showNotification({
        title: "Success",
        message: "Added Client",
    });
    router.push("/inventory");
  }


  return (
    <MainLayout title="New Client" >
        <Container pt={"lg"} p={"sm"}>
            <Box mb={"50px"}>
                <Title order={1}>New User</Title>
                <FormError error={createNewClient.error}/>
                <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    contact_number: "",
                    alt_contact_number: "",
                    avatar: null,
                    identity_number: "",
                    vat_number: "",
                }}
                onSubmit={(values, actions) => {
                    createNewClient.mutate({
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        contact_number: values.contact_number,
                        alt_contact_number: values.alt_contact_number,
                        avatar: values.avatar,
                        identity_number: values.identity_number,
                        vat_number: values.vat_number,
                    });

                }}
                >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                    <TextInput
                        label={"First Name"}
                        onChange={(e) => props.setFieldValue("first_name", e.target.value)}
                        value={props.values.first_name}
                        name={"first_name"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"First Name"}
                        radius={"sm"}
                    />
                    <TextInput
                        label={"Last Name"}
                        onChange={(e) => props.setFieldValue("last_name", e.target.value)}
                        value={props.values.last_name}
                        name={"last_name"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Last Name"}
                        radius={"sm"}
                    /> 
                    <TextInput
                        label={"Email"}
                        onChange={(e) => props.setFieldValue("email", e.target.value)}
                        value={props.values.email}
                        name={"email"}
                        type="email"
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Email"}
                        radius={"sm"}
                    /> 
                    <TextInput
                        label={"Contact Number"}
                        onChange={(e) => props.setFieldValue("contact_number", e.target.value)}
                        value={props.values.contact_number}
                        name={"contact_number"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Contact Number"}
                        radius={"sm"}
                    />   
                    <TextInput
                        label={"Alt Contact Number"}
                        onChange={(e) => props.setFieldValue("alt_contact_number", e.target.value)}
                        value={props.values.alt_contact_number}
                        name={"alt_contact_number"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Alt Contact Number"}
                        radius={"sm"}
                    />
                    {/* <FileInput   
                        label={"Avatar"}
                        onChange={(e) => props.setFieldValue("avatar", e)}
                        value={props.values.avatar}
                        name={"avatar"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Avatar"}
                        radius={"sm"}
                    />          */}
                    <TextInput
                        label={"Vat Number"}
                        onChange={(e) => props.setFieldValue("vat_number", e.target.value)}
                        value={props.values.vat_number}
                        name={"vat_number"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Vat Number"}
                        radius={"sm"}
                    />             
                    <TextInput
                        label={"Identity Number"}
                        onChange={(e) => props.setFieldValue("identity_number", e.target.value)}
                        value={props.values.identity_number}
                        name={"identity_number"}
                        withAsterisk
                        required
                        mb={10}
                        placeholder={"Identity Number"}
                        radius={"sm"}
                    />
                        
                    <Button type={"submit"} loading={createNewClient.isLoading}>Insert</Button>
                    </form>
                )}
                </Formik>
            </Box>
        </Container>
    </MainLayout>
  );
}
