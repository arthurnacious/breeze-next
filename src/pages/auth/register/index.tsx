import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import PageContainer from "@/components/layout/PageContainer";
import Link from "next/link";
import { Formik } from "formik";
import {
  accountant,
  address,
  clientType,
  supplier,
} from "@/libs/types/RegistrationType";
import { useAccountantMutation } from "@/graphql/generates";
import { client } from "@/libs/graphQLClient";
import { useRouter } from "next/router";
import { DatePicker } from "@mantine/dates";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";
import { showNotification } from "@mantine/notifications";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import IndexCard from "@/components/layout/Cards/IndexCard";

Index.propTypes = {};

function Index(props) {
  const router = useRouter();
  const [AccountType, setAccountType] = useState("Accountant");

  function SuccessRegister(values) {}

  const AccountantSubmission = useAccountantMutation(client, {
    onSuccess: (data, variables, context) => {
      showNotification({
        color: "green",
        title: `Registration was Successful`,
        message: "We are logging you in",
      });
      signIn("credentials", {
        email: variables.email,
        password: variables.password,
      });
    },
    onError: (error, variables, context) => {
      //TODO: Backend validation to ensure Error Messages are better.
    },
    onSettled: (variables, context, error, data) => {},
  });

  return (
    <PageContainer>
      <Card shadow={"sm"} p={"lg"} radius={"md"} withBorder>
        <Card.Section>
          <Title order={3} align={"center"}>
            Register to Ibis
          </Title>
        </Card.Section>
        <Grid>
          <Grid.Col span={3}>
            <Text variant={"text"}>Have an account with us?</Text>
            <Link href={"/auth/login"}>
              <Text variant={"link"} style={{ cursor: "pointer" }}>
                Login Here
              </Text>
            </Link>
          </Grid.Col>
          <Divider orientation={"vertical"} size={"sm"} />
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={6}>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                contact_number: "",
                alt_contact_number: "",
                accountant: accountant,
                supplier: supplier,
                address: address,
                client: clientType,
              }}
              onSubmit={(values, formikHelpers) => {
                formikHelpers.setSubmitting(true);
                AccountantSubmission.mutate({
                  email: values.email,
                  accreditation_number: values.accountant.accreditation_number,
                  accreditations: values.accountant.accreditations,
                  accreditation_expiry: values.accountant.accreditation_expiry,
                  first_name: values.first_name,
                  last_name: values.last_name,
                  password: values.password,
                  contact_number: values.contact_number,
                  alt_contact_number: values.alt_contact_number,
                  address: {
                    create: {
                      province_state: values.address.province_state,
                      city: values.address.city,
                      country: {
                        connect: "1",
                      },
                      line_1: values.address.line1,
                      line_2: values.address.line2,
                    },
                  },
                  website: values.accountant.website,
                });
              }}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Group w={"100%"} px={0} mx={0} position={"apart"}>
                    <TextInput
                      mt={10}
                      label={"First Name"}
                      mb={10}
                      name={"first_name"}
                      onChange={props.handleChange}
                      value={props.values.first_name}
                    />
                    <TextInput
                      mt={10}
                      mb={10}
                      label={"Last Name"}
                      name={"last_name"}
                      onChange={props.handleChange}
                      value={props.values.last_name}
                    />
                  </Group>

                  <TextInput
                    mt={10}
                    mb={10}
                    label={"Email"}
                    type={"email"}
                    name={"email"}
                    onChange={props.handleChange}
                    value={props.values.email}
                  />
                  <PasswordInput
                    mt={10}
                    mb={10}
                    label={"Password"}
                    name={"password"}
                    onChange={props.handleChange}
                    value={props.values.password}
                  />
                  <PasswordInput
                    mt={10}
                    mb={10}
                    label={"Confirm Password"}
                    name={"confirm_password"}
                    onChange={props.handleChange}
                    value={props.values.confirm_password}
                  />
                  <TextInput
                    mt={10}
                    mb={10}
                    label={"Contact Number"}
                    name={"contact_number"}
                    onChange={props.handleChange}
                    value={props.values.contact_number}
                  />

                  <TextInput
                    mt={10}
                    mb={10}
                    label={"Alternative Contact Number"}
                    name={"alt_contact_number"}
                    onChange={props.handleChange}
                    value={props.values.alt_contact_number}
                  />
                  <Select
                    label={"Account Type"}
                    data={["Client", "Supplier", "Accountant"]}
                    defaultValue={AccountType}
                    mt={10}
                    mb={10}
                    onChange={(value) => setAccountType(value)}
                  />

                  {/*Account Section*/}
                  {AccountType === "Accountant" && (
                    <>
                      <Group position={"apart"}>
                        <TextInput
                          mt={10}
                          mb={10}
                          label={"Accreditation"}
                          name={"accountant.accreditations"}
                          onChange={props.handleChange}
                          value={props.values.accountant.accreditations}
                        />
                        <TextInput
                          mt={10}
                          mb={10}
                          label={"Accreditation Number"}
                          name={"accountant.accreditation_number"}
                          onChange={props.handleChange}
                          value={props.values.accountant.accreditation_number}
                        />
                      </Group>
                      <DatePicker
                        placeholder={"Pick date"}
                        label={"Accreditation Expiry Date"}
                        withAsterisk
                        name={"accountant.accreditation_expiry"}
                        onChange={(e) =>
                          props.setFieldValue(
                            "accountant.accreditation_expiry",
                            e.toISOString()
                          )
                        }
                        value={props.values.accountant.accreditation_expiry}
                      />
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"Website"}
                        name={"accountant.website"}
                        onChange={props.handleChange}
                        value={props.values.accountant.website}
                      />
                      <Textarea
                        mt={10}
                        mb={10}
                        label={"Biography"}
                        name={"accountant.biography"}
                        onChange={props.handleChange}
                        value={props.values.accountant.biography}
                      />
                    </>
                  )}
                  {AccountType === "Supplier" && (
                    <>
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"Company Name"}
                        name={"supplier.name"}
                        onChange={props.handleChange}
                        value={props.values.supplier.name}
                      />
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"VAT Number"}
                        name={"supplier.vat_number"}
                        onChange={props.handleChange}
                        value={props.values.supplier.vat_number}
                      />
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"Contact Person"}
                        name={"supplier.contact_person"}
                        onChange={props.handleChange}
                        value={props.values.supplier.contact_person}
                      />
                    </>
                  )}

                  {AccountType === "Client" && (
                    <>
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"VAT Number"}
                        name={"client.vat_number"}
                        onChange={props.handleChange}
                        value={props.values.client.vat_number}
                      />
                      <TextInput
                        mt={10}
                        mb={10}
                        label={"Identity Number"}
                        name={"client.identity_number"}
                        onChange={props.handleChange}
                        value={props.values.client.identity_number}
                      />
                    </>
                  )}

                  <Button type={"submit"}>Submit</Button>
                </form>
              )}
            </Formik>
          </Grid.Col>
        </Grid>
      </Card>
    </PageContainer>
  );
}

export default Index;
