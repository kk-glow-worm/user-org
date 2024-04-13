import { FormEvent, useContext, useState } from "react";
import { defaultTo, isEmpty } from "lodash";
import { Step } from "../../../../hooks/useWizard";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { SetStep, WizardContext } from "../../../../context/WizardContext";
import {
  UpdateData,
  usePostUserDetails,
} from "../../../../hooks/apis/usePostUserDetails";
import { useFetchDivisions } from "../../../../hooks/apis/useFetchDivisions";
import { RadioBtn } from "./components/RadioBtn";
import styles from "./Edit.module.css";
/*******************************************
 helpers
 *******************************************/
export const namespace = "@user-org/wizard/edit/";
// HTML names
export const firstNameHTMLName = `${namespace}/first-name`;
const divisionHTMLName = `${namespace}/division`;
// testing IDs
export const firstNameTestID = `${namespace}/first-name`;
// content
export const errorMsg = "First name is required";
const handleSubmit =
  (
    setHasError: (isNotValid: boolean) => void,
    setStep: SetStep,
    updateData: UpdateData,
  ) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = defaultTo(
      formData.get(firstNameHTMLName)?.toString().trim(),
      "",
    );
    const divisionID = defaultTo(
      formData.get(divisionHTMLName)?.toString(),
      "",
    );
    const hasError = isEmpty(firstName) || isEmpty(divisionID);

    setHasError(hasError);

    // update user details and redirect to details page
    if (!hasError) {
      setStep(Step.Completed);
      updateData(firstName, divisionID);
    }
  };
/*******************************************
 component
 *******************************************/
export const Edit = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName, divisionID } = useContext(UserDetailsContext);
  const { updateData } = usePostUserDetails();
  const { endDivisions } = useFetchDivisions();
  const [hasError, setHasError] = useState(false);

  return (
    <form
      method="post"
      onSubmit={handleSubmit(setHasError, setStep, updateData)}
      data-testid={namespace}
    >
      <div className={styles.firstNameSection}>
        <label className={styles.label}>First name:</label>
        <input
          data-testid={firstNameTestID}
          name={firstNameHTMLName}
          defaultValue={firstName}
          className={styles.input}
        />
        {hasError && (
          <p data-testid="error-message" className={styles.errorMessage}>
            {errorMsg}
          </p>
        )}
      </div>
      <div>
        {endDivisions.map(({ name, id }) => (
          <RadioBtn
            label={name}
            key={id}
            name={divisionHTMLName}
            value={id}
            isChecked={id === divisionID}
          />
        ))}
      </div>
      <button type="submit" className={styles.btn}>
        Save
      </button>
    </form>
  );
};
