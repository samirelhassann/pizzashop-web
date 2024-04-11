/* eslint-disable @typescript-eslint/no-shadow */
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

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

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export default function OrderTableFilters() {
  const [serachParams, setSearchParams] = useSearchParams();
  const { statusFilterOptions, defaultStatusFilter } = useTableFilter();

  const orderId = serachParams.get("orderId");
  const customerName = serachParams.get("customerName");
  const status = serachParams.get("status");

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId || "",
        customerName: customerName || "",
        status: status || defaultStatusFilter,
      },
    });
  {
    const handleFilter = ({
      customerName,
      orderId,
      status,
    }: OrderFiltersSchema) => {
      setSearchParams((state) => {
        if (orderId) {
          state.set("orderId", orderId);
        } else {
          state.delete("orderId");
        }

        if (customerName) {
          state.set("customerName", customerName);
        } else {
          state.delete("customerName");
        }

        if (status) {
          state.set("status", status);
        } else {
          state.delete("status");
        }

        state.set("page", "1");

        return state;
      });
    };

    const handleCleanFilters = () => {
      setSearchParams((state) => {
        state.delete("orderId");
        state.delete("customerName");
        state.delete("status");
        state.set("page", "1");

        return state;
      });
      reset();
    };

    return (
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center gap-2 "
      >
        <span className="text-sm font-semibold">Filter</span>
        <Input
          placeholder="Order Id"
          className="w-auto h-8"
          {...register("orderId")}
        />
        <Input
          placeholder="Client Name"
          className="h-8 w-[320px]"
          {...register("customerName")}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select defaultValue={defaultStatusFilter} {...field}>
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
          )}
        />

        <Button type="submit" variant="secondary" size="xs">
          <Search className="w-4 h-4 mr-2" />
          Filter Results
        </Button>

        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleCleanFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Clean Filters
        </Button>
      </form>
    );
  }
}
