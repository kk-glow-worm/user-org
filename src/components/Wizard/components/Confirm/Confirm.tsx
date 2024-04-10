import { useContext } from "react";
import { WizardContext } from "../../../../context";
import { Step } from "../../../../hooks";

export const Confirm = () => {
  const { setStep } = useContext(WizardContext);

  return (
    <div>
      confirm
      <button
        onClick={() => {
          setStep(Step.Completed);
        }}
      >
        Confirm
      </button>
    </div>
  );
};
