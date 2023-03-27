import { usePageMode } from "@/hooks/pageMode";
import { NavLink, SegmentedControl } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function TransactionsNavbar({ hidden }) {
  const router = useRouter();
  
  const { setPageMode, pageMode } = usePageMode((state) => state)

  if(hidden === "transactions"){
    const navIitems = [
      {
        label: "Index",
        to: "/transactions"
      }
    ]

    return (
      <>
      <SegmentedControl      
          onChange={(value) => setPageMode(value)}
          defaultValue={pageMode}
          data={[
            { label: 'View', value: 'view' },
            { label: 'Edit', value: 'edit' }
          ]}
          fullWidth={true}
          mb={10}
        />
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