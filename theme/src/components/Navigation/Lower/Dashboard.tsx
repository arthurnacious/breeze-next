import { NavLink } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function DashboardNavbar({hidden}) {
  const router = useRouter();
  if(hidden === "dashboard"){
    const navIitems = [
      {
        label: "Dashboard",
        to: "/dashboard"
      }
    ]

    return (
      <>
        {navIitems.map((item, index) =>
            <Link href={item.to}
                  key={index} >
                <NavLink
                  label={item.label}
                  style={{ width: "100%" }}
                  active={router.pathname === item.to}
                />
            </Link>
          )
        }
      </>
    );
  }
}

export default DashboardNavbar;
