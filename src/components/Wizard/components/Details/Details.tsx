import { useContext } from "react";
import { WizardContext } from "../../../../context";
import { Step } from "../../../../hooks";

export const Details = () => {
  const { setStep } = useContext(WizardContext);

  return (
    <div>
      details
      <button
        onClick={() => {
          setStep(Step.Edit);
        }}
      >
        Edit
      </button>
    </div>
  );
};
