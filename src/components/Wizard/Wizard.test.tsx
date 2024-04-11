import { IWizard, SetStep, WizardContext } from "../../context/WizardContext";
import { Step } from "../../hooks/useWizard";
import { render, screen } from "@testing-library/react";
import { editComponentTestID } from "./components/Edit";
import { Wizard } from "./Wizard";
import { detailsComponentTestID } from "./components/Details";

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
    expect(screen.queryByTestId(editComponentTestID)).toBeInTheDocument();
  });

  test("shows <Edit> at Step.Completed", () => {
    renderFunc({ ...wizardCtx, step: Step.Completed });
    expect(screen.queryByTestId(detailsComponentTestID)).toBeInTheDocument();
  });
});
