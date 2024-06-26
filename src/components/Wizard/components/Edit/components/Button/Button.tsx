import { ReactNode } from "react";
import styles from "./Button.module.css";

export type BtnType = "submit" | "reset" | "button";
export type BtnStyle = "primary" | "secondary";
const getStyle = (style: BtnStyle) => {
  switch (style) {
    case "primary":
      return styles.btn;
    case "secondary":
      return styles.btnSecondary;
  }
};

interface IProps {
  children: ReactNode;
  type?: BtnType;
  handleClick?: () => void;
  btnStyle?: BtnStyle;
  className?: string;
}
export const Button = ({
  children,
  type = "button",
  btnStyle = "primary",
  handleClick,
  className = "",
}: IProps) => (
  <button
    className={`${getStyle(btnStyle)} ${className}`}
    onClick={handleClick}
    type={type}
  >
    {children}
  </button>
);
