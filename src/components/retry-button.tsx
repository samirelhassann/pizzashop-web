import { RefreshCcw, RefreshCwOff } from "lucide-react";

import { Button } from "./ui/button";

interface RetryButtonProps {
  resetErrorBoundary: () => void;
}

export default function RetryButton({ resetErrorBoundary }: RetryButtonProps) {
  return (
    <Button
      variant="ghost"
      size="xs"
      className="cursor-pointer group"
      onClick={resetErrorBoundary}
    >
      <RefreshCcw className="hidden w-4 h-4 text-muted-foreground group-hover:block" />
      <RefreshCwOff className="w-4 h-4 text-rose-400 group-hover:hidden" />
    </Button>
  );
}
