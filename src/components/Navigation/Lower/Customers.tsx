import { NavLink, SegmentedControl } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CustomersNavbar({ hidden, pageMode, setPageMode  }) {
  const router = useRouter();
  if(hidden === "customers"){
    const navIitems = [
      {
        label: "Customers",
        to: "/customers"
      },
      {
        label: "Quotations",
        to: "/customers/quotations"
      },
      {
        label: "Invoices",
        to: "/customers/invoices"
      },
    ]

    return (
      <>
       <SegmentedControl      
          onChange={(value) => setPageMode(value)}
          data={[
            { label: 'View', value: 'view' },
            { label: 'Edit', value: 'edit' }
          ]}
          fullWidth
          defaultValue={pageMode}
          mb={10}
        />
        {navIitems.map((item, index) =>
            <Link href={item.to}
                key={index}>
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

export default CustomersNavbar;
