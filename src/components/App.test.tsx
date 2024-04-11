import App from "./App";
import { render, screen } from "@testing-library/react";
import { userOrgComponentTestID } from "./UserOrg";

describe("<App>", () => {
  test("<App> renders <UserOrg>", () => {
    render(<App />);
    expect(screen.queryByTestId(userOrgComponentTestID)).toBeInTheDocument();
  });
});
