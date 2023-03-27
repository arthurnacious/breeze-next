import React from "react";
import MainLayout from "@/components/layout/Layout/Main";
import { Button, Container } from "@mantine/core";
import Link from "next/link";

function Index() {

  return (
    <MainLayout title="Non Stock Items" >
      <Container>
        <Link href={`/dashboard`}>
          <Button variant={"filled"} >
            Proceed to platform
          </Button>
        </Link>
      </Container>
    </MainLayout>
  );
}

export default Index;
