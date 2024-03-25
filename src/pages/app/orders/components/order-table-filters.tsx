import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTableFilter } from "../hooks/use-table-filter";

export default function OrderTableFilters() {
  const { statusFilterOptions, defaultStatusFilter } = useTableFilter();

  return (
    <form className="flex items-center gap-2 ">
      <span className="text-sm font-semibold">Filter</span>
      <Input placeholder="Order Id" className="w-auto h-8" />
      <Input placeholder="Client Name" className="h-8 w-[320px]" />
      <Select defaultValue={defaultStatusFilter}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {statusFilterOptions.map((status) => (
            <SelectItem key={status.toLowerCase()} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="w-4 h-4 mr-2" />
        Filter Results
      </Button>

      <Button type="submit" variant="outline" size="xs">
        <X className="w-4 h-4 mr-2" />
        Clean Filters
      </Button>
    </form>
  );
}
