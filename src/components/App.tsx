import { UserOrg } from "./UserOrg";
import { UserDetailsProvider, WizardProvider } from "../context";
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
