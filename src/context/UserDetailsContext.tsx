import { createContext, ReactNode } from "react";
import { useFetchUserDetails } from "../hooks/apis/useFetchUserDetails";
/*******************************************
 context
 *******************************************/
export interface IUserDetails {
  firstName: string;
  divisionID: string;
  isLoading: boolean;
  isMissingUserDetails: boolean;
}
export const UserDetailsContext = createContext<IUserDetails>({
  firstName: "",
  divisionID: "",
  isLoading: true,
  isMissingUserDetails: true,
});
/*******************************************
 context provider
 *******************************************/
interface IProps {
  children: ReactNode;
}
export const UserDetailsProvider = ({ children }: IProps) => {
  const { isLoading, firstName, divisionID, isMissingUserDetails } =
    useFetchUserDetails();

  return (
    <UserDetailsContext.Provider
      value={{ firstName, divisionID, isMissingUserDetails, isLoading }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
