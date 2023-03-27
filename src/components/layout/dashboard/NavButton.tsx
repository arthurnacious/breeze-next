import { Button, Container, Flex, Tooltip, Text } from "@mantine/core";
import { BiHomeCircle } from "react-icons/bi";
import React, { Component } from "react";
import { router } from "next/client";
import { useRouter } from "next/router";

interface NavButtonProps {
  opened: boolean;
  icon: JSX.Element;
  active: string;
  navigate?: () => void;
  label: string;
}

export default function NavButton({
  opened,
  icon,
  active,
  navigate,
  label,
}: NavButtonProps) {
  const router = useRouter();
  function isActive(active: string): boolean {
    if (active.toLowerCase() === label.toLowerCase()) return true;
  }

  return (
    <>
      <Button
        mb={"xs"}
        variant={isActive(active) ? "filled" : "subtle"}
        onClick={navigate}
        leftIcon={opened ? icon : null}
        fullWidth={true}
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          style={{
            display: opened ? "none" : "flex",
          }}
        >
          {icon}
        </div>

        <Text
          ml={"xs"}
          style={{
            display: opened ? "flex" : "none",
          }}
        >
          {label}
        </Text>
      </Button>
    </>
  );
}
