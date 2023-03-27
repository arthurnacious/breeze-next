import React, { ReactNode, useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import MainNavbar from "../../Navigation/MainNavbar";
import LoadingContainer from "../../general/containers/LoadingContainer";

interface Props {
    children?: ReactNode
  }
  
  function AuthLayout({ children }: Props) {
  // const { data: session, status } = useSession();
  const [pageMode, setPageMode] = useState('view');

  return (    
    <AppShell>
      {React.cloneElement(children, {pageMode:pageMode })}
    </AppShell>
  );
}

export default AuthLayout;
