import { useContext } from "react";
import { capitalize } from "lodash";
import { UserDetailsContext } from "../../../../context/UserDetailsContext";
import { WizardContext, SetStep } from "../../../../context/WizardContext";
import { Step } from "../../../../hooks/useWizard";
import { useFetchDivisions } from "../../../../hooks/apis/useFetchDivisions";
import styles from "./Details.module.css";
import { DivisionCard } from "./DivisionCard";
import EditIcon from "./assets/edit.svg";
/*******************************************
 helpers
 *******************************************/
const updateToEditStep = (setStep: SetStep) => () => {
  setStep(Step.Edit);
};
export const namespace = "@user-org/wizard/details";
/*******************************************
 component
 *******************************************/
export const Details = () => {
  const { setStep } = useContext(WizardContext);
  const { firstName } = useContext(UserDetailsContext);
  const {
    userDivision: { id: userDivisionID },
    directUpperIDsToTop,
    divisionsObj,
  } = useFetchDivisions();

  return (
    <div data-testid={namespace}>
      <div className={styles.org}>
        {[userDivisionID, ...directUpperIDsToTop].reverse().map((id) => (
          <DivisionCard divisionName={divisionsObj[id]?.name} key={id} />
        ))}
        <div className={styles.user}>
          <button className={styles.circle} onClick={updateToEditStep(setStep)}>
            <div className={styles.firstName}>{capitalize(firstName)}</div>
            <img src={EditIcon} className={styles.edit} alt="edit" />
          </button>
        </div>
      </div>
    </div>
  );
};
/*******************************************
 export for testing
 *******************************************/
export { updateToEditStep };
