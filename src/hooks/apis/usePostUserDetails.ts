import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";
import { swrKey } from "./useFetchUserDetails";
/*******************************************
 helpers
 *******************************************/
export type UpdateData = (firstName: string, divisionID: string) => void;

const mutateOptions = { revalidate: false };
const mutateData =
  (mutate: ScopedMutator) =>
  (firstName = "", divisionID = "") => {
    mutate(swrKey, { firstName, divisionID }, mutateOptions);
  };
/*******************************************
 hooks
 *******************************************/
export const usePostUserDetails = () => {
  const { mutate } = useSWRConfig();

  return {
    updateData: mutateData(mutate),
  };
};
