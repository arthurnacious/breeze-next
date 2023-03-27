import React from "react";
import { ActionIcon, Card, Center, Flex, Title } from "@mantine/core";
import { BiHomeCircle } from "react-icons/bi";

interface ShowcaseCardProps {
  title: string;
  path?: string;
  icon: JSX.Element;
  data: string;
  buttonText: string;
}

function ShowcaseCard({
  title,
  path,
  icon,
  data,
  buttonText,
}: ShowcaseCardProps) {
  return (
    <Card
      shadow={"sm"}
      p={"lg"}
      radius={"md"}
      withBorder
      style={{ overflow: "visible" }}
    >
      <Card.Section inheritPadding py={"xs"}>
        <Flex
          align={"center"}
          justify={"center"}
          style={{
            transform: "translateY(-30px)",
          }}
        >
          <ActionIcon
            size={80}
            color={"green.9"}
            variant={"filled"}
            radius={"lg"}
          >
            {icon}
          </ActionIcon>
        </Flex>
      </Card.Section>

      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Title size={"lg"}>{title}</Title>
        <Title>{data}</Title>
      </Flex>

      <Title size={"sm"} pt={8} variant={"link"}>
        {buttonText}
      </Title>
    </Card>
  );
}

export default ShowcaseCard;
