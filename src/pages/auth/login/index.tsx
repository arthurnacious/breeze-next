import React, { FormEvent, useEffect, useState } from "react";
import { FaExclamation } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  Card,
  Grid,
  Tabs,
  TextInput,
  Text,
  Divider,
  Title,
  Checkbox,
  Button,
  Alert,
} from "@mantine/core";

import { useAuth } from '@/hooks/auth'
import Link from "next/link";

function Index() {
  const router = useRouter()

  const { login } = useAuth({
      middleware: 'guest',
      redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
      if (router.query?.reset?.length > 0 && errors.length === 0) {
          setStatus(atob(router.query.reset))
      } else {
          setStatus(null)
      }
  })

  const submitForm = async (event: React.FormEvent<FormEvent>) => {
      event.preventDefault()

      login({
          email,
          password,
          remember: shouldRemember,
          setErrors,
          setStatus,
          setLoading,
      })
  }

  return (
    <div className="login">
      <Grid>
        <Grid.Col span={3}></Grid.Col>
        <Grid.Col span={6}>
          <Card>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Tabs
                  defaultValue="signIn"
                  radius="lg"
                  styles={(theme) => ({
                    tab: {
                      ...theme.fn.focusStyles(),
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.white,
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[0]
                          : theme.colors.gray[9],
                      border: `1px solid ${
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[4]
                      }`,
                      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                      cursor: "pointer",
                      fontSize: theme.fontSizes.md,
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "1%",
                      marginBottom: "2px",
                      borderRadius: "16px 16px 16px 16px",
                    },
                  })}
                >
                  <Tabs.List position="center">
                    <Tabs.Tab value="signIn">Sign In</Tabs.Tab>
                    <Tabs.Tab value="start">Start</Tabs.Tab>
                  </Tabs.List>

                  {/* SIGN IN TAB */}
                  <Tabs.Panel value="signIn" pt="lg">
                    <Grid>
                      <Grid.Col span={4}>
                        <Text variant="text" align="center">
                          Do not have an account with us?
                        </Text>
                        <Link href={"/auth/register"}>
                          <Text
                            variant="text"
                            align="center"
                            style={{ cursor: "pointer", color: "#F59F00" }}
                          >
                            Register Here
                          </Text>
                        </Link>
                      </Grid.Col>
                      <Divider orientation="vertical" size="sm" />
                      <Grid.Col span={1}></Grid.Col>
                      <Grid.Col span={6}>
                        {errors.length > 0 && (
                          <Alert
                            icon={<FaExclamation />}
                            title="Bummer!"
                            color="red"
                          >
                            {errors.map((error, key) => (
                              <p key={key}>{error.message}</p>
                            ))}
                          </Alert>
                        )}
                        <form onSubmit={submitForm}>
                          <Title
                            variant="text"
                            align="center"
                            size="lg"
                            weight={"bold"}
                          >
                            SIGN IN
                          </Title>
                          <TextInput
                            label="EMAIL"
                            withAsterisk
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          ></TextInput>
                          <TextInput
                            label="Password"
                            withAsterisk
                            type="password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          ></TextInput>
                          <Grid>
                            <Grid.Col span={7}>
                              <Text variant="link" align="left">
                                Reset password
                              </Text>
                            </Grid.Col>
                            {/* <Grid.Col span={5}>
                              <Checkbox label="Remember" />
                            </Grid.Col> */}
                            <Grid.Col span={5}>
                              <Button
                                type="submit"
                                disabled={loading}
                                sx={{ borderRadius: "12rem", marginTop: "9%" }}
                              >
                                Login
                              </Button>
                            </Grid.Col>
                          </Grid>
                        </form>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                  <Tabs.Panel value="start">
                    <Grid>
                      <Grid.Col span={12}>
                        <Text variant="text" align="center">
                          Thank you
                        </Text>
                        <Text variant="text" align="center">
                          You will receive a link to your iBIS Dashboard once
                          your payment is processed (usually within an hour).
                        </Text>
                        <Text variant="text" align="center">
                          While you wait, you might enjoy reading the iBIS blog.
                        </Text>
                        <Text variant="text" align="center">
                          Any questions? Reach out to your premium support.
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                </Tabs>
              </Card.Section>
            </Card>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Index;
