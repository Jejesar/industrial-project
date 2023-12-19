import { Tag } from "./types";

export const tagsConfig: Tag[] = [
  {
    name: "dp1",
    type: "Booléen",
    address: "%I1000.0",
    value: false,
  },
  {
    name: "dc1",
    type: "Booléen",
    address: "%I1000.1",
    value: false,
  },
  {
    name: "dp2",
    type: "Booléen",
    address: "%I1000.2",
    value: false,
  },
  {
    name: "dc2",
    type: "Booléen",
    address: "%I1000.3",
    value: false,
  },
  {
    name: "a1_1",
    type: "Booléen",
    address: "%I1000.4",
    value: false,
  },
  {
    name: "a1_2",
    type: "Booléen",
    address: "%I1000.6",
    value: false,
  },
  {
    name: "b1_1",
    type: "Booléen",
    address: "%I1000.5",
    value: false,
  },
  {
    name: "b1_2",
    type: "Booléen",
    address: "%I1000.7",
    value: false,
  },
  {
    name: "A1PLUS",
    type: "Booléen",
    address: "%Q1000.0",
    value: false,
  },
  {
    name: "B1PLUS",
    type: "Booléen",
    address: "%Q1000.1",
    value: false,
  },
  {
    name: "C1PLUS",
    type: "Booléen",
    address: "%Q1000.2",
    value: false,
  },
  {
    name: "A2PLUS",
    type: "Booléen",
    address: "%Q1000.3",
    value: false,
  },
  {
    name: "B2PLUS",
    type: "Booléen",
    address: "%Q1000.4",
    value: false,
  },
  {
    name: "C2PLUS",
    type: "Booléen",
    address: "%Q1000.5",
    value: false,
  },
  {
    name: "Enable_1",
    type: "Booléen",
    address: "%Q1000.6",
    value: false,
  },
  {
    name: "Enable_2",
    type: "Booléen",
    address: "%Q1000.7",
    value: false,
  },
  {
    name: "SetV_1",
    type: "Int",
    address: "%QW1001",
    value: 0,
  },
  {
    name: "SetV_2",
    type: "Int",
    address: "%QW1002",
    value: 0,
  },
  {
    name: "RedTruck2",
    type: "Booléen",
    address: "",
    value: false,
  },
  {
    name: "GreenTruck2",
    type: "Booléen",
    address: "",
    value: false,
  },
  {
    name: "BlueTruck2",
    type: "Booléen",
    address: "",
    value: false,
  },
  {
    name: "air",
    type: "Int",
    address: "%QW1002",
    value: 0,
    // il faut le diviser par 100 pour avoir en L/min
  },
];
