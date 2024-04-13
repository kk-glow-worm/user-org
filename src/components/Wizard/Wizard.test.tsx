import { render, screen } from "@testing-library/react";
import { IWizard, SetStep, WizardContext } from "../../context/WizardContext";
import { Step } from "../../hooks/useWizard";
import { Wizard } from "./Wizard";
import { namespace as editTestID } from "./components/Edit";
import { namespace as detailsTestID } from "./components/Details";

describe("<Wizard>", () => {
  const wizardCtx = {
    setStep: jest.fn() as unknown as SetStep,
    step: Step.Edit,
  };
  const renderFunc = (wizardCtx: IWizard) => {
    render(
      <WizardContext.Provider value={wizardCtx}>
        <Wizard />
      </WizardContext.Provider>,
    );
  };

  test("shows <Edit> at Step.Edit", () => {
    renderFunc(wizardCtx);
    expect(screen.queryByTestId(editTestID)).toBeInTheDocument();
  });

  test("shows <Edit> at Step.Completed", () => {
    renderFunc({ ...wizardCtx, step: Step.Completed });
    expect(screen.queryByTestId(detailsTestID)).toBeInTheDocument();
  });
});
