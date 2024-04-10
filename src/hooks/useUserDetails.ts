import { useState } from "react";
import { isEmpty } from "lodash";

export interface UserDetails {
  firstName: string;
  divisionID: string;
}
export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    divisionID: "",
  } as UserDetails);

  const setFirstName = (firstName: string) =>
    setUserDetails({ ...userDetails, firstName });

  const setDivisionID = (divisionID: string) =>
    setUserDetails({ ...userDetails, divisionID });

  const isCompleted =
    !isEmpty(userDetails.firstName) && !isEmpty(userDetails.divisionID);

  return {
    userDetails,
    setFirstName,
    setDivisionID,
    isCompleted,
  };
};
