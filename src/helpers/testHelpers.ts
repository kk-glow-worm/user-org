import { IDivision, parseToObj } from "../hooks/apis/useFetchDivisions";

const divisionTop: IDivision = {
  id: "0a",
  name: "test 0",
  directUpperDivision: "",
  directLowerDivisions: ["1a"],
};
const divisionA: IDivision = {
  id: "1a",
  name: "test 1",
  directUpperDivision: "0a",
  directLowerDivisions: ["2a,", "3a"],
};
const divisionB: IDivision = {
  id: "2a",
  name: "test 2",
  directUpperDivision: "1a",
  directLowerDivisions: [],
};
const divisionC: IDivision = {
  id: "3a",
  name: "test 3",
  directUpperDivision: "1a",
  directLowerDivisions: [],
};
const divisions = [divisionTop, divisionA, divisionB, divisionC];
const divisionsObj = parseToObj(divisions)();

export {
  divisions,
  divisionsObj,
  divisionA,
  divisionTop,
  divisionB,
  divisionC,
};
