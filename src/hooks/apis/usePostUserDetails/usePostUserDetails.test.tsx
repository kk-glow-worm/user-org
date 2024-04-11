import { mutateData } from "./usePostUserDetails";
import { swrKey } from "../useFetchUserDetails";

describe("usePostUserDetails() ", () => {
  test("mutateData()", () => {
    const mutate = jest.fn();
    const firstName = "K";
    const divisionID = "1a";

    mutateData(mutate)(firstName, divisionID);
    expect(mutate).toBeCalledWith(
      swrKey,
      { divisionID, firstName },
      { revalidate: false },
    );
    mutateData(mutate)();
    expect(mutate).toBeCalledWith(
      swrKey,
      { divisionID: "", firstName: "" },
      { revalidate: false },
    );
  });
});
