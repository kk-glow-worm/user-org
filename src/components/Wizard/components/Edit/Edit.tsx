import { FormEvent, useContext, useState } from "react";
import { isEmpty } from "lodash";
import { Step } from "../../../../hooks";
import {
  SetStep,
  UserDetailsContext,
  WizardContext,
} from "../../../../context";
import { UpdateData, usePostUserDetails } from "../../../../hooks/apis";

const handleSubmit =
  (
    setHasError: (isNotValid: boolean) => void,
    setStep: SetStep,
    updateData: UpdateData,
  ) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName")?.toString().trim() || "";
    const hasError = isEmpty(firstName);

    setHasError(hasError);
    // update user details and redirect to details page
    if (!hasError) {
      setStep(Step.Completed);
      updateData(firstName, "123");
    }
  };

export const Edit = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName = "" } = useContext(UserDetailsContext);
  const { updateData } = usePostUserDetails();
  const [hasError, setHasError] = useState(false);
  return (
    <form
      method="post"
      onSubmit={handleSubmit(setHasError, setStep, updateData)}
    >
      First name: <input name="firstName" defaultValue={firstName} />
      {hasError && <p>error message</p>}
      <button type="submit">Save</button>
    </form>
  );
};
