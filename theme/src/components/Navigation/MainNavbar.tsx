import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Navbar,
  Title,
  Button,
  Avatar,
  Menu,
  Container,
} from "@mantine/core";
import { AiFillDatabase, AiFillSetting, AiOutlineBell } from "react-icons/ai";
import { GiMoneyStack, GiPriceTag } from "react-icons/gi";
import { GoDashboard, GoSignOut } from "react-icons/go";
import { FaClipboardList, FaCubes, FaUserTag } from "react-icons/fa";
import NavButton from "../layout/dashboard/NavButton";
import DashboardNavbar from "@/components/Navigation/Lower/Dashboard";
import InventoryNavbar from "@/components/Navigation/Lower/Inventory";
import ProductsNavbar from "@/components/Navigation/Lower/Products";
import CustomersNavbar from "@/components/Navigation/Lower/Customers";
import ProjectsNavbar from "@/components/Navigation/Lower/Projects";
import StatementsNavbar from "@/components/Navigation/Lower/Statements";
import TransactionsNavbar from "@/components/Navigation/Lower/Transactions";
import Link from "next/link";


function MainNavbar({user, logout}) {

  const { asPath } = useRouter();
  const router = useRouter();
  const [iconHover, setIconHover] = useState(false);
  const [active, setActive] = useState("dashboard");

  function iconHovered() {
    setIconHover(!iconHover);
  }

  useEffect(() => {
    let activ = asPath.split("/")[1]
    setActive(activ)
  }, [active, asPath]);

  return (
    <Navbar p={"xs"} height={"100vh"} width={{ base: 300 }}>
      <Navbar.Section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Title>Ibis</Title>
        <Menu shadow={"md"}>
          <Menu.Target>
            <Button variant={"subtle"} mr={"xs"} radius={"xl"}>
              <Avatar />
            </Button>
          </Menu.Target>
          <Menu.Dropdown style={{ zIndex: "100" }}>
            <Menu.Label>{`${user?.first_name} ${user?.last_name}`}</Menu.Label>
            <Menu.Item icon={<AiFillSetting />}> User Settings</Menu.Item>
            <Menu.Item icon={<GoSignOut />} onClick={() => logout()}> Sign Out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button radius={"xl"} variant={"subtle"}>
          <AiOutlineBell size={20} />
        </Button>
      </Navbar.Section>
      <Navbar.Section
        style={{ display: "flex", alignContent: "center", zIndex: "5" }}
        grow
        py={"md"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: iconHover ? "100%" : "auto",
          }}
          onMouseEnter={() => iconHovered()}
          onMouseLeave={() => iconHovered()}
        >
        <Link href="/dashboard">
          <NavButton
            label={"Dashboard"}
            opened={iconHover}
            icon={<GoDashboard size={20} />}
            active={active}
          />
          </Link>
          <Link href="/inventory">
           <NavButton
            label={"Inventory"}
            opened={iconHover}
            icon={<FaCubes size={20} />}
            active={active}
            />
          </Link>
          <Link href="/clients">
            <NavButton
              opened={iconHover}
              label={"Clients"}
              icon={<FaUserTag size={20} />}
              active={active}
            />
          </Link>
          <Link href="/projects">
            <NavButton
              opened={iconHover}
              label={"Projects"}
              icon={<AiFillDatabase size={20} />}
              active={active}
              />
          </Link>
          <Link href="/statements">
            <NavButton
              opened={iconHover}
              label={"Statements"}
              icon={<FaClipboardList size={20} />}
              active={active}
              />
          </Link>
          <Link href="/transactions">
          <NavButton
            opened={iconHover}
            label={"Transactions"}
            icon={<GiMoneyStack size={20} />}
            active={active}
            />
          </Link>
        </div>
        <Container
          px={"md"}
          style={{
            display: iconHover ? "none" : "block",
            width: "100%",
            height: "100%",
          }}
        >
          <DashboardNavbar hidden={active}/>
          <InventoryNavbar hidden={active}/>
          <ProductsNavbar hidden={active}/>
          <CustomersNavbar hidden={active} />
          <ProjectsNavbar hidden={active}/>
          <StatementsNavbar hidden={active}/>
          <TransactionsNavbar hidden={active} />
        </Container>
      </Navbar.Section>
    </Navbar>
  );
}

export default MainNavbar;
