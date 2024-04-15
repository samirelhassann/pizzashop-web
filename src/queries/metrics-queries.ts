/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { getDayOrdersAmountService } from "@/services/get-day-order-amount/get-day-orders-amount-service";
import { GetDayOrdersAmountServiceResponse } from "@/services/get-day-order-amount/get-day-orders-amount-service-response";
import { getMonthCanceledOrdersAmountService } from "@/services/get-month-canceled-orders-amount/get-month-canceled-orders-amount-service";
import { GetMonthCanceledOrdersAmountServiceResponse } from "@/services/get-month-canceled-orders-amount/get-month-canceled-orders-amount-service-response";
import { getMonthOrdersAmountService } from "@/services/get-month-orders-amount/get-month-orders-amount-service";
import { GetMonthOrderAmountServiceResponse } from "@/services/get-month-orders-amount/get-month-orders-amount-service-response";
import { getMonthRevenueService } from "@/services/get-month-revenue/get-month-revenue-service";
import { GetMonthRevenueServiceResponse } from "@/services/get-month-revenue/get-month-revenue-service-response";

const KEY = "metrics";

interface UseMetricsQueriesProps {
  useMonthRevenueData: () => UseSuspenseQueryResult<
    GetMonthRevenueServiceResponse,
    Error
  >;
  useDayOrderAmountData: () => UseSuspenseQueryResult<
    GetDayOrdersAmountServiceResponse,
    Error
  >;
  useMonthOrderAmountData: () => UseSuspenseQueryResult<
    GetMonthOrderAmountServiceResponse,
    Error
  >;
  useMonthCanceledOrderAmountData: () => UseSuspenseQueryResult<
    GetMonthCanceledOrdersAmountServiceResponse,
    Error
  >;
}

export function useMetricsQueries(): UseMetricsQueriesProps {
  const useMonthRevenueData = () => {
    return useSuspenseQuery({
      queryKey: [KEY, "month-revenue"],
      queryFn: () => getMonthRevenueService(),
    });
  };

  const useDayOrderAmountData = () => {
    return useSuspenseQuery({
      queryKey: [KEY, "day-order-amount"],
      queryFn: () => getDayOrdersAmountService(),
    });
  };

  const useMonthOrderAmountData = () => {
    return useSuspenseQuery({
      queryKey: [KEY, "month-order-amount"],
      queryFn: () => getMonthOrdersAmountService(),
    });
  };

  const useMonthCanceledOrderAmountData = () => {
    return useSuspenseQuery({
      queryKey: [KEY, "month-canceled-orders-amount"],
      queryFn: () => getMonthCanceledOrdersAmountService(),
    });
  };

  return {
    useMonthRevenueData,
    useDayOrderAmountData,
    useMonthOrderAmountData,
    useMonthCanceledOrderAmountData,
  };
}
