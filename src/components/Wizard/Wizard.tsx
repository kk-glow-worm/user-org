import { Step } from "../../hooks";
import { Edit, Confirm, Details } from "./components";
import { useContext } from "react";
import { WizardContext } from "../../context";

export const Wizard = () => {
  const { step } = useContext(WizardContext);

  switch (step) {
    case Step.Edit:
      return <Edit />;
    case Step.Confirm:
      return <Confirm />;
    case Step.Completed:
      return <Details />;
  }

  return null;
};
