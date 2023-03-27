import { NavLink } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function StatementsNavbar({ hidden }) {
  const router = useRouter();
  if(hidden === "statements"){
    const navIitems = [
      {
        label: "Statements",
        to: "/statements"
      },      
      {
        label: "Chart Of Accounts",
        to: "/statements/chart-of-accounts"
      },      
      {
        label: "General Ledger",
        to: "/statements/general-ledger"
      },      
      {
        label: "General Journal",
        to: "/statements/general-journal"
      },      
      {
        label: "Fixed Asset Register",
        to: "/statements/fixed-asset-register"
      }
    ]

    return (
      <>
        {navIitems.map((item, index) =>
        
          <Link href={item.to}
              key={index}>
            <NavLink
              label={item.label}
              style={{ width: "100%" }}
              onClick={() => router.push(item.to)}
              active={router.pathname === item.to}
            />
          </Link>
          )
        }
      </>
    )
  }
}
