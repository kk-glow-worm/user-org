import { FormEvent, useContext, useState } from "react";
import { isEmpty } from "lodash";
import { Step } from "../../../../hooks/useWizard";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { SetStep, WizardContext } from "../../../../context/WizardContext";
import {
  UpdateData,
  usePostUserDetails,
} from "../../../../hooks/apis/usePostUserDetails";
/*******************************************
 helpers
 *******************************************/
export const firstNameHTMLName = "first-name";
export const firstNameTestID = "@user-org/wizard/edit/first-name";
export const editComponentTestID = "@user-org/wizard/edit";
export const errorMsg = "error message";
const handleSubmit =
  (
    setHasError: (isNotValid: boolean) => void,
    setStep: SetStep,
    updateData: UpdateData,
  ) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get(firstNameHTMLName)?.toString().trim() || "";
    const hasError = isEmpty(firstName);

    setHasError(hasError);
    // update user details and redirect to details page
    if (!hasError) {
      setStep(Step.Completed);
      updateData(firstName, "123");
    }
  };
/*******************************************
 component
 *******************************************/
export const Edit = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName = "" } = useContext(UserDetailsContext);
  const { updateData } = usePostUserDetails();
  const [hasError, setHasError] = useState(false);
  return (
    <form
      method="post"
      onSubmit={handleSubmit(setHasError, setStep, updateData)}
      data-testid={editComponentTestID}
    >
      First name:
      <input
        data-testid={firstNameTestID}
        name={firstNameHTMLName}
        defaultValue={firstName}
      />
      {hasError && <p data-testid="error-message">{errorMsg}</p>}
      <button type="submit">Save</button>
    </form>
  );
};
