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
const mockModule = jest.mock(
  "../../../../hooks/apis/usePostUserDetails/usePostUserDetails",
  () => ({
    updateData: jest.fn(),
  }),
);
describe("<Edit> component", () => {
  const btnName = "Save";
  const wizardCtx = {
    setStep: jest.fn() as unknown as SetStep,
    step: Step.Completed,
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
    expect(screen.queryByText(errorMsg)).toBeInTheDocument();
  });
  it("renders when first name is not empty and saves new name after clicks on Save", async () => {
    const userCtx = {
      firstName: "kyle",
      divisionID: "1a",
      isMissingUserDetails: false,
      isLoading: false,
    };

    const newName = "Tom";

    renderFunc(userCtx, wizardCtx);

    // displays first name from context
    const firstNameEl = await screen.findByTestId(firstNameTestID);
    expect(firstNameEl).toHaveValue(userCtx.firstName);
    // clicks on Save btn saves new first name
    fireEvent.change(firstNameEl, { target: { value: newName } });
    fireEvent.click(screen.getByText(btnName));
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    expect(wizardCtx.setStep).toBeCalledWith(Step.Completed);
    expect(firstNameEl).toHaveValue(newName);
  });
});
