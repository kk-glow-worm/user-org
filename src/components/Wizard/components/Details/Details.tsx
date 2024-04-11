import { useContext } from "react";
import { WizardContext, UserDetailsContext } from "../../../../context";
import { Step } from "../../../../hooks";

export const Details = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName } = useContext(UserDetailsContext);

  return (
    <div>
      {firstName}
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
