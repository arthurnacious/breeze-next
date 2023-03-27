import { NavLink } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function InventoryNavbar({ hidden }) {
  const router = useRouter();
  if(hidden === "inventory"){
    const navIitems = [
      {
        label: "Stock Items",
        to: "/inventory/stock-items"
      },
      {
        label: "Non Stock Items",
        to: "/inventory/non-stock-items"
      },
      {
        label: "Services Rendered",
        to: "/inventory/services-rendered"
      },
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
    );
  }
  
}
