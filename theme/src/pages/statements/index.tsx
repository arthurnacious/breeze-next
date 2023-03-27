import React from 'react'
import { Box, Container, Title } from '@mantine/core'
import MainLayout from "@/components/layout/Layout/Main";

export default function index() {
  return (
    <MainLayout title="Statements" >
        <Container pt={"lg"} p={"sm"}>
        <Box mb={"50px"}>
            <Title order={1}>Projects</Title>
        </Box>
    </Container>
  </MainLayout>
  )
}
