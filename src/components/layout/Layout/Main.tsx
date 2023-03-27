import React, { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import MainNavbar from "../../Navigation/MainNavbar";
import { useAuth } from "@/hooks/auth";
import Head from "next/head";

interface Props {
  title?: String
  children?: ReactNode
}

function Layout({ children, title }: Props) {
  const { user, logout } = useAuth({ middleware: 'auth' })
  return (
    <>
      { title &&
        <Head>
          <title>{title}</title>
        </Head> 
      } 
      <AppShell navbar={<MainNavbar user={user} logout={logout} />}>
        {children}
      </AppShell>
    </>
  );
}

export default Layout;
