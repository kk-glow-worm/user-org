import { Step } from "../../../../hooks";
import { useContext } from "react";
import { WizardContext } from "../../../../context";

export const Edit = () => {
  const { setStep } = useContext(WizardContext);
  return (
    <div>
      edit
      <button
        onClick={() => {
          setStep(Step.Confirm);
        }}
      >
        Next
      </button>
    </div>
  );
};
