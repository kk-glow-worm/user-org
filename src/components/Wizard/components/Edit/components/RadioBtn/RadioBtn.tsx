interface IProps {
  label: string;
  name: string;
  isChecked: boolean;
  value: string;
}
export const RadioBtn = ({ label, name, value, isChecked }: IProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={isChecked}
      />
      {label}
    </label>
  );
};
