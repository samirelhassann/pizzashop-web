import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export default function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) ?? 1;
  const formatedCurrentPageInfo = `Page ${pageIndex + 1} of ${pages}`;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">First Page</span>
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="mx-3 text-sm font-medium">
            {formatedCurrentPageInfo}
          </div>

          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Last Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
