import { Card, Flex, MantineColor, Text, useMantineTheme } from "@mantine/core";
import { Line } from "react-chartjs-2";
import React from "react";
import {
  ChartInit,
  chartOptions,
  getChartBackgroundPlugin,
} from "../../../../../theme/ChartTheme";

interface GraphCardProps {
  data: {
    labels: string[];
    datasets: Array<DataSets>;
  };
  CardLabel: string;
  Color: MantineColor;
}

interface DataSets {
  data: number[];
  fill?: boolean;
  borderColor?: string;
  tension?: number;
  backgroundColor?: string;
}

function GraphCard({ CardLabel, Color, data }: GraphCardProps) {
  const theme = useMantineTheme();
  ChartInit();
  const chartBackgroundPlugin = getChartBackgroundPlugin(Color);

  return (
    <Card
      shadow={"sm"}
      p={"lg"}
      radius={"md"}
      withBorder
      style={{ overflow: "visible" }}
    >
      <Card.Section inheritPadding p={"xs"}>
        <Flex
          align={"center"}
          justify={"center"}
          style={{
            transform: "translateY(-30px)",
            width: "100%",
          }}
        >
          <Card shadow={"lg"} radius={"md"} withBorder style={{ width: "90%" }}>
            <Card.Section>
              <Line
                data={data}
                options={chartOptions}
                plugins={[chartBackgroundPlugin]}
              />
            </Card.Section>
          </Card>
        </Flex>
      </Card.Section>
      <Flex justify={"center"}>
        <Text>{CardLabel}</Text>
      </Flex>
    </Card>
  );
}

export default GraphCard;
