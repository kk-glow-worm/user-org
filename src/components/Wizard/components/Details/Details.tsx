import { useContext } from "react";
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
    userDivision: { name: divisionName },
    directUpperIDsToTop,
    divisionsObj,
  } = useFetchDivisions();

  return (
    <div data-testid={namespace}>
      <div className={styles.org}>
        {directUpperIDsToTop.reverse().map((id) => (
          <DivisionCard divisionName={divisionsObj[id].name} key={id} />
        ))}
        <div className={styles.user}>
          <button className={styles.circle} onClick={updateToEditStep(setStep)}>
            <div className={styles.firstName}>{firstName}</div>
            <img src={EditIcon} className={styles.edit} alt="edit" />
          </button>
          <span className={styles.divisionName}>{divisionName}</span>
        </div>
      </div>
    </div>
  );
};
/*******************************************
 export for testing
 *******************************************/
export { updateToEditStep };
