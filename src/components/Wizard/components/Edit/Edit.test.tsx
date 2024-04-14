import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import {
  SetStep,
  WizardContext,
  IWizard,
} from "../../../../context/WizardContext";
import {
  UserDetailsContext,
  IUserDetails,
} from "../../../../context/UserDetailsContext";
import { Step } from "../../../../hooks/useWizard";
import { Edit, errorMsg, firstNameTestID } from "./Edit";
import { namespace } from "../Details";
jest.mock("../../../../hooks/apis/useFetchDivisions", () => ({
  useFetchDivisions: () => ({
    endDivisions: [{ id: "2a" }, { id: "3a" }],
    userDivision: { id: "2a", name: "Test Division" },
  }),
}));
describe("<Edit> component", () => {
  const btnName = "Save";
  const wizardCtx = {
    setStep: jest.fn() as unknown as SetStep,
    step: Step.Edit,
  };
  const renderFunc = (userCtx: IUserDetails, wizardCtx: IWizard) => {
    render(
      <UserDetailsContext.Provider value={userCtx}>
        <WizardContext.Provider value={wizardCtx}>
          <Edit />
        </WizardContext.Provider>
      </UserDetailsContext.Provider>,
    );
  };

  it("renders when first name is empty and shows error msg when click on Save", async () => {
    const userCtx = {
      firstName: "",
      divisionID: "1a",
      isMissingUserDetails: false,
      isLoading: false,
    };

    renderFunc(userCtx, wizardCtx);

    // displays first name from context
    const firstNameEl = await screen.findByTestId(firstNameTestID);
    expect(firstNameEl).toHaveValue(userCtx.firstName);
    // clicks on Save btn triggers error message
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(btnName));
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
  it("renders when first name is not empty and saves new name after clicks on Save", async () => {
    const userCtx = {
      firstName: "kyle",
      divisionID: "2a",
      isMissingUserDetails: false,
      isLoading: false,
    };

    const newName = "Tom";

    renderFunc(userCtx, wizardCtx);

    // displays first name from context
    const firstNameEl = await screen.findByTestId(firstNameTestID);
    expect(firstNameEl).toHaveValue(userCtx.firstName);
    // change first name
    fireEvent.change(firstNameEl, { target: { value: newName } });
    // cancel to have the step to completed
    fireEvent.click(screen.getByText("Cancel"));
    expect(wizardCtx.setStep).toHaveBeenNthCalledWith(1, Step.Completed);
    // clicks on Save btn saves new first name
    fireEvent.click(screen.getByText(btnName));
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    expect(wizardCtx.setStep).toHaveBeenNthCalledWith(2, Step.Completed);
  });
});
