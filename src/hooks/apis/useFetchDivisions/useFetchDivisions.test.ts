import {
  defaultDivision,
  getDirectDivisionsToTop,
  getDivisionByID,
  getEndDivisions,
  parseToObj,
} from "./useFetchDivisions";
import {
  divisionA,
  divisionB,
  divisionC,
  divisions,
  divisionsObj,
  divisionTop,
} from "../../../helpers/testHelpers";
describe("useFetchDivisions()", () => {
  test("parseToObj() returns obj of divisions having id as key", () => {
    const obj = parseToObj(divisions)();
    expect(obj).toEqual({
      "0a": divisionTop,
      "1a": divisionA,
      "2a": divisionB,
      "3a": divisionC,
    });
  });
  test("getEndDivisions() returns end divisions that have no direct lower levels", () => {
    expect(JSON.stringify(getEndDivisions(divisions)())).toEqual(
      JSON.stringify([divisionB, divisionC]),
    );
  });
  test("getDirectDivisionsToTop() returns direct upper levels till the top", () => {
    expect(getDirectDivisionsToTop(divisionC, divisionsObj)()).toEqual([
      "1a",
      "0a",
    ]);
  });
  test("getDivisionByID() returns division by its ID", () => {
    expect(getDivisionByID("1a", divisionsObj)()).toEqual(divisionA);
    expect(getDivisionByID("not-exist", parseToObj(divisions)())()).toEqual(
      defaultDivision,
    );
  });
});
