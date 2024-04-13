import styles from "./RadioBtn.module.css";
interface IProps {
  label: string;
  name: string;
  isChecked: boolean;
  value: string;
}
export const RadioBtn = ({ label, name, value, isChecked }: IProps) => {
  return (
    <label className={styles.btn}>
      <input
        type="radio"
        name={name}
        value={value}
        className={styles.input}
        defaultChecked={isChecked}
      />
      {label}
    </label>
  );
};
