import { WizardContext } from "../../context/WizardContext";
import { UserDetailsContext } from "../../context/UserDetailsContext";
import { Step, useInitWizard } from "../../hooks/useWizard";
import { Wizard } from "../Wizard";
import { Details } from "../Wizard/components/Details";
import { useContext } from "react";
/*******************************************
 helpers
 *******************************************/
export const loaderTestID = "@user-org/loading";
export const userOrgComponentTestID = "@user-org";
const shallShowDetails = (
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

  if (isLoading) {
    return (
      <div data-testid={userOrgComponentTestID}>
        <div data-testid={loaderTestID}>loading</div>
      </div>
    );
  }

  return (
    <div data-testid={userOrgComponentTestID}>
      {shallShowDetails(isLoading, isMissingUserDetails, step) ? (
        <Details />
      ) : (
        <Wizard />
      )}
    </div>
  );
};
/*******************************************
 export for testing
 *******************************************/
export { shallShowDetails };
