import { UserDetails } from "../hooks";
import { createContext } from "react";

export const UserDetailsContext = createContext<UserDetails>({
  firstName: "",
  divisionID: "",
});
