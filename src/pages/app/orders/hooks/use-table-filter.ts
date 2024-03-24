import { useMemo } from "react";

interface UseTableFilterProps {
  statusFilterOptions: string[];
  defaultStatusFilter: string;
}

export function useTableFilter(): UseTableFilterProps {
  const statusFilterOptions = useMemo(() => {
    return ["All", "Pending", "Doing", "Delivering", "Delivered", "Canceled"];
  }, []);

  const defaultStatusFilter = statusFilterOptions[0];

  return { statusFilterOptions, defaultStatusFilter };
}
