import useSWR from "swr";
import { defaultTo, isEmpty, keyBy } from "lodash";
import { fetcher } from "../../../helpers/swr";
import { useContext, useMemo } from "react";
import { UserDetailsContext } from "../../../context/UserDetailsContext";
export const swrKey = "./mock/divisions.json";
/*******************************************
 helpers
 *******************************************/
export interface IDivision {
  id: string;
  name: string;
  directUpperDivision: string;
  directLowerDivisions: string[];
}
const defaultDivision: IDivision = {
  id: "",
  name: "",
  directUpperDivision: "",
  directLowerDivisions: [],
};
export interface IDivisionsObj {
  [id: string]: IDivision;
}
const parseToObj = (divisions: IDivision[]) => (): IDivisionsObj =>
  keyBy(divisions, "id");
const getDivisionByID =
  (id: string, divisionsObj: IDivisionsObj) => (): IDivision =>
    defaultTo(divisionsObj[id], defaultDivision);
const getEndDivisions = (divisions: IDivision[]) => (): IDivision[] =>
  divisions.filter(({ directLowerDivisions }) => isEmpty(directLowerDivisions));
const getDirectDivisionsToTop =
  ({ directUpperDivision }: IDivision, divisionsObj: IDivisionsObj) =>
  () => {
    const upperIDs = [];
    let upper = directUpperDivision;
    while (!isEmpty(upper)) {
      upperIDs.push(upper);
      upper = divisionsObj[upper].directUpperDivision;
    }
    return upperIDs;
  };
/*******************************************
 hooks
 *******************************************/
export const useFetchDivisions = () => {
  // fetch data
  const { data: divisions = [] } = useSWR<IDivision[]>(swrKey, fetcher);
  // context
  const { divisionID } = useContext(UserDetailsContext);
  const divisionsObj = useMemo(parseToObj(divisions), [divisions]); // convert divisions array into an obj for faster look up
  // computed props
  const userDivision = useMemo(getDivisionByID(divisionID, divisionsObj), [
    divisionID,
    divisionsObj,
  ]);
  const endDivisions = useMemo(getEndDivisions(divisions), [divisions]);
  const directUpperIDsToTop = useMemo(
    getDirectDivisionsToTop(userDivision, divisionsObj),
    [userDivision, divisionsObj],
  );

  return {
    divisions,
    divisionsObj,
    userDivision,
    endDivisions,
    directUpperIDsToTop,
  };
};
/*******************************************
 export for testing
 *******************************************/
export {
  parseToObj,
  getEndDivisions,
  getDirectDivisionsToTop,
  getDivisionByID,
  defaultDivision,
};
