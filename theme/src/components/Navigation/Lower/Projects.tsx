import { NavLink } from '@mantine/core'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

export default function ProjectsNavbar({hidden}) {
  const router = useRouter();
  if(hidden === "projects"){
    const navIitems = [
      {
        label: "Projects",
        to: "/projects"
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
