import { render, screen } from "@testing-library/react";
import { RadioBtn } from "./RadioBtn";

describe("<RadioBtn>", () => {
  test("renders", () => {
    const label = "test-label";
    const name = "test-name";
    const value = "test value";
    render(<RadioBtn label={label} name={name} isChecked value={value} />);
    const radioBtnEl = screen.queryByLabelText(label);
    expect(radioBtnEl).toBeChecked();
    expect(radioBtnEl).toHaveAttribute("name", name);
    expect(radioBtnEl).toHaveAttribute("value", value);
  });
});
