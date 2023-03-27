import { NavLink } from '@mantine/core'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function ProductsNavbar({hidden}) {
  const router = useRouter();
  if(hidden === "products"){
    const navIitems = [
      {
        label: "Products",
        to: "/products"
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
    );
  }
}
