import { render, screen } from "@testing-library/react";
import { IWizard, SetStep, WizardContext } from "../../context/WizardContext";
import {
  IUserDetails,
  UserDetailsContext,
} from "../../context/UserDetailsContext";
import { loaderTestID, shallShowDetails, UserOrg } from "./UserOrg";
import { Step } from "../../hooks/useWizard";
import { namespace as detailsComponentTestID } from "../Wizard/components/Details";
import { namespace as editComponentTestID } from "../Wizard/components/Edit";

describe("<UserOrg> component", () => {
  const wizardCtx = {
    setStep: jest.fn() as unknown as SetStep,
    step: Step.Completed,
  };
  const userCtx = {
    firstName: "kyle",
    divisionID: "1a",
    isMissingUserDetails: false,
    isLoading: true,
  };
  const renderFunc = (userCtx: IUserDetails, wizardCtx: IWizard) => {
    render(
      <UserDetailsContext.Provider value={userCtx}>
        <WizardContext.Provider value={wizardCtx}>
          <UserOrg />
        </WizardContext.Provider>
      </UserDetailsContext.Provider>,
    );
  };

  test("<UserOrg> shows loading", async () => {
    renderFunc(userCtx, wizardCtx);
    const loader = await screen.findByTestId(loaderTestID);
    expect(loader).toBeInTheDocument();
  });

  test("<UserOrg> shows <Details>", async () => {
    renderFunc({ ...userCtx, isLoading: false }, wizardCtx);
    const details = await screen.findByTestId(detailsComponentTestID);
    expect(details).toBeInTheDocument();
  });

  test("<UserOrg> shows <Edit>", async () => {
    renderFunc(
      { ...userCtx, isLoading: false, isMissingUserDetails: true },
      { ...wizardCtx, step: Step.Edit },
    );
    const edit = await screen.findByTestId(editComponentTestID);
    expect(edit).toBeInTheDocument();
  });

  test("shallShowEdit()", () => {
    // is loading
    expect(shallShowDetails(true, true, Step.Edit)).toBeFalsy();
    expect(shallShowDetails(true, false, Step.Edit)).toBeFalsy();
    // is missing details
    expect(shallShowDetails(false, true, Step.Edit)).toBeFalsy();
    // not loading, not missing details, not edit step = show details
    expect(shallShowDetails(false, false, Step.Completed)).toBeTruthy();
  });
});
