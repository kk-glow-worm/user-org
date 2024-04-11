import { useContext } from "react";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { WizardContext, SetStep } from "../../../../context/WizardContext";
import { Step } from "../../../../hooks/useWizard";
/*******************************************
 helpers
 *******************************************/
const updateToEditStep = (setStep: SetStep) => () => {
  setStep(Step.Edit);
};
export const detailsComponentTestID = "@user-org/wizard/details";
export const firstNameTestID = "@user-org/wizard/details/first-name";
/*******************************************
 component
 *******************************************/
export const Details = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName } = useContext(UserDetailsContext);

  return (
    <div data-testid={detailsComponentTestID}>
      <p data-testid={firstNameTestID}>{firstName}</p>
      <button onClick={updateToEditStep(setStep)}>Edit</button>
    </div>
  );
};
/*******************************************
 export for testing
 *******************************************/
export { updateToEditStep };
