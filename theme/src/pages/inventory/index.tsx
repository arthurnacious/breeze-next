import React from 'react'
import { Box, Button, Container, NavLink, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import MainLayout from "@/components/layout/Layout/Main";
import Link from 'next/link';

export default function index() {  
  let router = useRouter()
  return (
    <MainLayout>
        <Container pt={"lg"} p={"sm"}>
        <Button
            color="teal"
            style={{ margin: "20px 0" }}
          >
            <Link href="/inventory/create">
              Add New
            </Link>
        </Button>
        <Box mb={"50px"}>
            <Title order={1}>Inventory</Title>
            <Link href={`/inventory/stock-items`}>
              <NavLink
              label="Stock Items"
              description="click here to view stock items"
              />
            </Link>
            <Link href={`/inventory/nonstock-items`}>
              <NavLink
                label="Non Stock Items"
                description="click here to view non stock items"
                />
              </Link>
            <Link href={`/inventory/services-rendered`}>
              <NavLink
                label="Services Rendered"
                description="click here to view services rendered"
              />
            </Link>
        </Box>
        </Container>
    </MainLayout>
  )
}
