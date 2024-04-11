import { useContext } from "react";
import { WizardContext } from "../../context";
import { Step } from "../../hooks";
import { Edit, Details } from "./components";

export const Wizard = () => {
  const { step } = useContext(WizardContext);

  switch (step) {
    case Step.Edit:
      return <Edit />;
    case Step.Completed:
      return <Details />;
    default:
      return <Details />;
  }
};
