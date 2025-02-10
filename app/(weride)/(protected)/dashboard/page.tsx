import OrdersTable from "./components/orders-table";

const orders = [
  {
    id: "ORD001",
    vehicle: "Bullet Raja",
    customer: "John Doe",
    status: "active",
    initialReading: "12450",
    finalReading: "",
    requestTime: "2024-02-09T10:00:00",
    timeLeft: "25:30",
  },
  {
    id: "ORD002",
    vehicle: "Activa 6G",
    customer: "Jane Smith",
    status: "pending",
    initialReading: "",
    finalReading: "",
    requestTime: "2024-02-09T09:45:00",
    timeLeft: "15:20",
  },
];

export default function AdminDashboard() {
  return <OrdersTable orders={orders} />;
}
