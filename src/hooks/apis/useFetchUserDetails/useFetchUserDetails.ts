import useSWR from "swr";
import { fetcher } from "../../../helpers/swr";
import { useMemo } from "react";
import { isEmpty } from "lodash";
/*******************************************
 helpers
 *******************************************/
export const swrKey = "./mock/user-details.json";
const fetchOnce = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
const hasEmptyValue = (firstName: string, divisionID: string) => () =>
  isEmpty(firstName) || isEmpty(divisionID);
/*******************************************
 hooks
 *******************************************/
export const useFetchUserDetails = () => {
  // fetch user details
  const { data: { firstName = "", divisionID = "" } = {}, isLoading } = useSWR(
    swrKey,
    fetcher,
    fetchOnce,
  );
  // parse
  const isMissingUserDetails = useMemo(hasEmptyValue(firstName, divisionID), [
    firstName,
    divisionID,
  ]);

  return {
    firstName,
    divisionID,
    isLoading,
    isMissingUserDetails,
  };
};
/*******************************************
 export for testing
 *******************************************/
export { hasEmptyValue };
