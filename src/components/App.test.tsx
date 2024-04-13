import App from "./App";
import { render, screen } from "@testing-library/react";
import { namespace as userOrgTestID } from "./UserOrg";

describe("<App>", () => {
  test("<App> renders <UserOrg>", () => {
    render(<App />);
    expect(screen.queryByTestId(userOrgTestID)).toBeInTheDocument();
  });
});
