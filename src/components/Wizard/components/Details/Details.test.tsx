import { render, screen, fireEvent } from "@testing-library/react";
import { SetStep, WizardContext } from "../../../../context/WizardContext";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { Step } from "../../../../hooks/useWizard";
import { Details, updateToEditStep } from "./Details";
jest.mock("../../../../hooks/apis/useFetchDivisions", () => ({
  useFetchDivisions: () => ({
    userDivision: { name: "2nd level", id: "2a" },
    directUpperIDsToTop: ["1a", "0a"],
    divisionsObj: {
      "0a": { id: "0a", name: "top level" },
      "1a": { id: "1a", name: "1st level" },
      "2a": { id: "2a", name: "2nd level" },
    },
  }),
}));
describe("<Details> component", () => {
  it("renders with given context and fires the click event", async () => {
    const userCtx = {
      firstName: "Kyle",
      divisionID: "2a",
      isMissingUserDetails: false,
      isLoading: false,
    };
    const wizardCtx = {
      setStep: jest.fn() as unknown as SetStep,
      step: Step.Completed,
    };

    render(
      <UserDetailsContext.Provider value={userCtx}>
        <WizardContext.Provider value={wizardCtx}>
          <Details />
        </WizardContext.Provider>
      </UserDetailsContext.Provider>,
    );
    // displays first name from context
    const firstNameEl = await screen.findByText(userCtx.firstName);
    expect(firstNameEl).toBeInTheDocument();
    // displays direct org char
    expect(screen.getByText("top level")).toBeInTheDocument();
    expect(screen.getByText("1st level")).toBeInTheDocument();
    expect(screen.getByText("Kyle")).toBeInTheDocument();
    // clicks on Edit btn updates step to Edit
    fireEvent.click(firstNameEl);
    expect(wizardCtx.setStep).toBeCalledWith(Step.Edit);
  });
});

// describe("<Details> helpers", () => {
//   test("updateToEditStep() updates step to Step.Edit", () => {
//     const setStep = jest.fn();
//     updateToEditStep(setStep as unknown as SetStep)();
//     expect(setStep).toBeCalledWith(Step.Edit);
//   });
// });
