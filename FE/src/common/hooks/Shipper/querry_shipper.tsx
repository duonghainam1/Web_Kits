import { useQuery } from "@tanstack/react-query";
import { getAllShipper } from "../../../_lib/Shipper/shipper";
export const useListAllShipper = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["List_shipper"],
    queryFn: async () => {
      return await getAllShipper();
    }
  });
  return { data, ...rest };
};
