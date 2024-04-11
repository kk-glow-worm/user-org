import { UserOrg } from "./UserOrg";
import { WizardProvider } from "../context/WizardContext";
import { UserDetailsProvider } from "../context/UserDetailsContext";
import React from "react";

function App() {
  return (
    <UserDetailsProvider>
      <WizardProvider>
        <UserOrg />
      </WizardProvider>
    </UserDetailsProvider>
  );
}

export default App;
