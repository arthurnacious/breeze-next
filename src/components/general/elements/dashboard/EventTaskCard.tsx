import { Card, Title, Text, ScrollArea, Grid, Button } from "@mantine/core";
import React from "react";

function EventTaskCard(props) {
  return (
    <Card
      shadow={"sm"}
      mt={"lg"}
      p={"lg"}
      radius={"md"}
      withBorder
      style={{ overflow: "visible" }}
    >
      <Card.Section withBorder>
        <Title align={"center"}>Next Appointment</Title>
        <Text align={"center"}> 22 Appointments</Text>
      </Card.Section>
      <ScrollArea.Autosize type={"auto"} offsetScrollbars>
        <Card.Section m={"lg"}>
          <Grid>
            <Grid.Col span={3}>Date</Grid.Col>
            <Grid.Col span={6}>Date</Grid.Col>
            <Grid.Col span={3}>Buttons</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>Date</Grid.Col>
            <Grid.Col span={6}>Date</Grid.Col>
            <Grid.Col span={3}>Buttons</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>Date</Grid.Col>
            <Grid.Col span={6}>Date</Grid.Col>
            <Grid.Col span={3}>Buttons</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>Date</Grid.Col>
            <Grid.Col span={6}>Date</Grid.Col>
            <Grid.Col span={3}>Buttons</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>Date</Grid.Col>
            <Grid.Col span={6}>Date</Grid.Col>
            <Grid.Col span={3}>Buttons</Grid.Col>
          </Grid>
        </Card.Section>
      </ScrollArea.Autosize>
      <Button
        fullWidth
        color={"green.9"}
        radius={"xl"}
        sx={{ transform: "translateY(30px)" }}
      >
        Add New
      </Button>
    </Card>
  );
}

export default EventTaskCard;
