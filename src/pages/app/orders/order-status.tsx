interface OrderStatusProps {
  status: "Pending" | "Completed" | "Cancelled";
}

export default function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center group" data-status={status}>
      <span className="w-2 h-2 mr-1.5 rounded-full group-data-[status=Completed]:bg-green-500 group-data-[status=Cancelled]:bg-rose-500 group-data-[status=Pending]:bg-slate-400" />
      <span className="font-medium text-muted-foreground">{status}</span>
    </div>
  );
}
