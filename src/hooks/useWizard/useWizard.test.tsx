import { initStep } from "./useWizard";
describe("useWizard()", () => {
  test("initStep()", () => {
    const isLoading = true;
    const isMissingUserDetails = true;
    const setStep = jest.fn();

    initStep(isLoading, isMissingUserDetails, setStep)();
    expect(setStep).not.toBeCalled();
    initStep(!isLoading, isMissingUserDetails, setStep)();
    expect(setStep).toBeCalled();
  });
});
