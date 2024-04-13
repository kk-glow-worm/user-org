import react from "react";
jest.mock("react", () => ({ useMemo: () => false }));

describe("useFetchUserDetails() ", () => {
  beforeEach(() => jest.resetModules());

  test("useFetchUserDetails() returns right data when data is not empty", () => {
    const data = {
      data: {
        firstName: "a",
        divisionID: "b",
      },
      isLoading: false,
    };
    jest.mock("swr", () => () => data);
    const { useFetchUserDetails } = require("./useFetchUserDetails");
    const result = useFetchUserDetails();
    expect(result.firstName).toBe("a");
    expect(result.divisionID).toBe("b");
    expect(result.isMissingUserDetails).toBeFalsy();
    expect(result.isLoading).toBeFalsy();
  });

  test("useFetchUserDetails() returns default values when data is empty", () => {
    jest.mock("swr", () => () => ({}));
    const { useFetchUserDetails } = require("./useFetchUserDetails");
    const result = useFetchUserDetails();
    expect(result.firstName).toBe("");
    expect(result.divisionID).toBe("");
  });

  test("hasEmptyValue()", () => {
    const { hasEmptyValue } = require("./useFetchUserDetails");
    expect(hasEmptyValue("", "")()).toBeTruthy();
    expect(hasEmptyValue("a", "")()).toBeTruthy();
    expect(hasEmptyValue("", "b")()).toBeTruthy();
    expect(hasEmptyValue("a", "b")()).toBeFalsy();
  });
});
