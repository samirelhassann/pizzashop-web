import { Suspense } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { useOrdersQueries } from "@/queries/orders-queries";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function Loading() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="w-32 h-6" />

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />

          <div className="mx-3 text-sm font-medium">
            <Skeleton className="w-[85px] h-6" />
          </div>

          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useData: getOrders } = useOrdersQueries();

  const page = searchParams.get("page") ?? "1";
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const filtersKey = `${page}-${orderId}-${customerName}-${status}`;

  const pageIndexUrl = z.coerce
    .number()
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .transform((page) => page - 1)
    .parse(page);

  const { data: result } = getOrders({
    filtersKey,
    serviceParams: {
      pageIndex: pageIndexUrl,
    },
  });

  const { totalCount, pageIndex, perPage } = result.meta;

  const pages = Math.ceil(totalCount / perPage) ?? 1;
  const formatedCurrentPageInfo = `Page ${pageIndex + 1} of ${pages}`;

  const handleFirstPage = () => {
    setSearchParams({ page: "1" });
  };

  const handlePreviousPage = () => {
    setSearchParams({ page: pageIndexUrl.toString() });
  };

  const handleNextPage = () => {
    setSearchParams({ page: (pageIndexUrl + 2).toString() });
  };

  const handleLastPage = () => {
    setSearchParams({ page: pages.toString() });
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={handleFirstPage}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">First Page</span>
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="mx-3 text-sm font-medium">
            {formatedCurrentPageInfo}
          </div>

          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            onClick={handleNextPage}
            disabled={pageIndex === pages - 1}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            disabled={pageIndex === pages - 1}
            onClick={handleLastPage}
          >
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Last Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Pagination() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
