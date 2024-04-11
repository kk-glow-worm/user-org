import { WizardContext, UserDetailsContext } from "../../context";
import { Step, useInitWizard } from "../../hooks";
import { Wizard, Details } from "../Wizard";
import { useContext } from "react";
/*******************************************
 helpers
 *******************************************/
const shallShowEdit = (
  isLoading: boolean,
  isMissingUserDetails: boolean,
  step: Step,
) => !isLoading && !isMissingUserDetails && step !== Step.Edit;
/*******************************************
 components
 *******************************************/
export const UserOrg = () => {
  const { step, setStep } = useContext(WizardContext);
  /* TODO: currently use context for user details due to manipulating swr to simulate post API,
      can be refreshed from swr when use real API then can remove the UserDetailsContext */
  const { isLoading, isMissingUserDetails } = useContext(UserDetailsContext);

  // init wizard to step Edit if user info is not complete
  useInitWizard(setStep);

  return (
    <>
      {isLoading && <div>loading</div>}
      {shallShowEdit(isLoading, isMissingUserDetails, step) ? (
        <Details />
      ) : (
        <Wizard />
      )}
    </>
  );
};
