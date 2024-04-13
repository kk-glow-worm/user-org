import styles from "./DivisionCard.module.css";
interface IProps {
  divisionName: string;
}
export const DivisionCard = ({ divisionName }: IProps) => (
  <div className={styles.divisionCard}>
    <span className={styles.divisionName}>{divisionName}</span>
    <div className={styles.orgLine} />
  </div>
);
