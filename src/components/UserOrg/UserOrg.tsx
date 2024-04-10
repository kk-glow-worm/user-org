import { useInitWizard, useUserDetails, useWizard } from "../../hooks";
import { WizardContext } from "../../context";
import React from "react";
import { Details } from "../Wizard/components";
import { Wizard } from "../Wizard";

export const UserOrg = () => {
  const { isCompleted } = useUserDetails();
  const { step, setStep } = useWizard();

  // init wizard to step Edit if user info is not complete
  useInitWizard(isCompleted, setStep);

  return (
    <WizardContext.Provider value={{ step, setStep }}>
      {isCompleted ? <Details /> : <Wizard />}
    </WizardContext.Provider>
  );
};
