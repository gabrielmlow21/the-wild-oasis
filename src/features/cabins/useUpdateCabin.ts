import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import { Cabin } from "../../types/cabin";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }: { newCabinData: Cabin; id: number }) =>
      updateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCabin, isUpdating };
}
