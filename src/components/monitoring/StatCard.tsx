"use client";

import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon?: ReactNode;
  tagName: string;
}

export default function StatsCard({
  title,
  stat,
  icon,
  tagName,
}: StatsCardProps) {
  return (
    <Stat
      minW={"300px"}
      px={2}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
          <StatHelpText>
            Capteur : <i>{tagName}</i>
          </StatHelpText>
        </Box>
        <Box
          my={"auto"}
          mx={{ base: 2, md: 4 }}
          fontSize={"xl"}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
      <Box></Box>
    </Stat>
  );
}
