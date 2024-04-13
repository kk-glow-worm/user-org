import { useContext } from "react";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { WizardContext, SetStep } from "../../../../context/WizardContext";
import { Step } from "../../../../hooks/useWizard";
import { useFetchDivisions } from "../../../../hooks/apis/useFetchDivisions";
/*******************************************
 helpers
 *******************************************/
const updateToEditStep = (setStep: SetStep) => () => {
  setStep(Step.Edit);
};
export const namespace = "@user-org/wizard/details";
export const firstNameTestID = `${namespace}/first-name`;
/*******************************************
 component
 *******************************************/
export const Details = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName } = useContext(UserDetailsContext);
  const {
    userDivision: { name: divisionName },
    directUpperIDsToTop,
    divisionsObj,
  } = useFetchDivisions();

  return (
    <div data-testid={namespace}>
      <p data-testid={firstNameTestID}>{firstName}</p>
      {directUpperIDsToTop.reverse().map((id) => (
        <p key={id}>{divisionsObj[id].name}</p>
      ))}

      <p>{divisionName}</p>

      <button onClick={updateToEditStep(setStep)}>Edit</button>
    </div>
  );
};
/*******************************************
 export for testing
 *******************************************/
export { updateToEditStep };
