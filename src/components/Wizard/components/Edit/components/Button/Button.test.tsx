import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  test("renders default as expected", async () => {
    render(<Button>one button</Button>);
    const btn = await screen.findByText("one button");
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveClass("btn");
  });
  test("renders as expected with props", async () => {
    render(
      <Button type="submit" btnStyle="secondary">
        one button
      </Button>,
    );
    const btn = await screen.findByText("one button");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveClass("btnSecondary");
  });
});
