import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("<Label />", () => {
  test("renders", () => {
    render(<Label>one label</Label>);
    const labelEl = screen.getByText("one label");
    expect(labelEl).toHaveClass("label");
  });
});
