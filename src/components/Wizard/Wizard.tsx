import { useContext } from "react";
import { WizardContext } from "../../context/WizardContext";
import { Step } from "../../hooks/useWizard";
import { Edit } from "./components/Edit";
import { Details } from "./components/Details";

export const Wizard = () => {
  const { step } = useContext(WizardContext);

  switch (step) {
    case Step.Edit:
      return <Edit />;
    case Step.Completed:
      return <Details />;
  }
};
