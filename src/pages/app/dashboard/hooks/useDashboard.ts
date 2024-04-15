import { useState } from "react";

interface UseDashboardProps {
  configValue: string;
}

export function useDashboard(): UseDashboardProps {
  const [configValue, setConfigValue] = useState<string>("");

  return { configValue };
}
