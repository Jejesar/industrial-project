interface IVariable {
  name: string;
  type: string | boolean;
  address: string;
  value: string | boolean;
  description: string;
}

const variablesPLC: IVariable[] = [
  {
    name: "dp1",
    type: "Boolean",
    address: "%I1000.0",
    value: false,
    description: "Product presence at 1st belt",
  },
  {
    name: "dc1",
    type: "Boolean",
    address: "%I1000.1",
    value: false,
    description: "Maximum queue detector at 1st belt",
  },
  {
    name: "dp2",
    type: "Boolean",
    address: "%I1000.2",
    value: false,
    description: "Product presence at 2nd belt",
  },
  {
    name: "dc2",
    type: "Boolean",
    address: "%I1000.3",
    value: false,
    description: "Maximum queue detector at 2nd belt",
  },
  {
    name: "a1_1",
    type: "Boolean",
    address: "%I1000.4",
    value: false,
    description: "Stopper cylinder backward at 1st belt-out",
  },
];

export default variablesPLC;
