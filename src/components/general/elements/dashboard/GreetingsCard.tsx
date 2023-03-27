import { Card, Flex, Grid, Image, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";
import returnGreeting from "../../../../libs/TimeOfDay";

function GreetingsCard(props) {
  const {
    data: { user },
  } = useSession();

  return (
    <Card shadow={"lg"} radius={"md"} withBorder mb={"xl"}>
      <Flex direction={"row"} justify={"space-between"} align={"center"}>
        <Grid sx={{ width: "100%" }}>
          <Grid.Col span={4}>
            <Image
              src={"https://robohash.org/hicveldicta.png"}
              alt={user.name}
            />
          </Grid.Col>
          <Grid.Col span={8} pl={"xl"}>
            <Title mb={"lg"}>
              {returnGreeting()} {user.name}
            </Title>
            <Title order={5}>
              There are some tasks requiring your attention:
            </Title>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
            <Flex justify={"space-between"} mr={"xl"}>
              <Text fz={"sm"}>Processed Statements</Text>
              <Text fz={"sm"}>499/500</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Flex>
    </Card>
  );
}

export default GreetingsCard;
