import { ReactNode } from "react";
import styles from "./Label.module.css";

interface IProps {
  children: ReactNode;
}
export const Label = ({ children }: IProps) => (
  <label className={styles.label}>{children}</label>
);
