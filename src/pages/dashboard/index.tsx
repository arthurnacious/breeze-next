import React from "react";
import {
  Box,
  Container,
  Grid,
  useMantineTheme,
} from "@mantine/core";
import MainLayout from "@/components/layout/Layout/Main";
import ShowcaseCard from "../../components/general/elements/dashboard/ShowcaseCard";
import { AiFillHeart } from "react-icons/ai";
import { FaBox, FaDollarSign, FaUser } from "react-icons/fa";
import GraphCard from "../../components/general/elements/dashboard/GraphCard";
import EventTaskCard from "../../components/general/elements/dashboard/EventTaskCard";
import GreetingsCard from "../../components/general/elements/dashboard/GreetingsCard";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30],
      fill: false,
      borderColor: "white",
      tension: 0.1,
      backgroundColor: "black",
    },
  ],
};

function Dashboard() {

  const theme = useMantineTheme();

  return (
    <MainLayout>
      <Container pt={"lg"} p={"sm"}>
        <Box mb={"50px"}>
          {/* <GreetingsCard /> */}
        </Box>
        <Grid>
          <Grid.Col span={3}>
            <ShowcaseCard
              icon={<AiFillHeart size={45} />}
              title={"Business Health"}
              data={"221"}
              buttonText={"View"}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <ShowcaseCard
              title={"Orders"}
              icon={<FaBox size={45} />}
              data={"1.3k"}
              buttonText={"View All"}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <ShowcaseCard
              title={"New Customers"}
              icon={<FaUser size={45} />}
              data={"3.2k"}
              buttonText={"View All"}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <ShowcaseCard
              title={"Profits"}
              icon={<FaDollarSign size={45} />}
              data={"R221.k"}
              buttonText={"View All"}
            />
          </Grid.Col>
        </Grid>
        <Grid pt={"xl"} mt={"xl"}>
          <Grid.Col span={6}>
            <GraphCard
              CardLabel={"Monthly Revenue"}
              data={data}
              Color={theme.colors.green[5]}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <GraphCard
              CardLabel={"Task Deadlines"}
              data={data}
              Color={theme.colors.gray[8]}
            />
          </Grid.Col>
        </Grid>
        <div>
          <EventTaskCard />
        </div>
      </Container>
    </MainLayout>
  );
}

export default Dashboard;
