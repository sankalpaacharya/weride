import { getAuthUserId, getOrdersByStatus } from "@/lib/supabase/queries";
import OrdersTable from "./components/orders-table";
import { redirect } from "next/navigation";

// make a object case convertor
export default async function AdminDashboard() {
  const allowedUsers = [
    "78eb5773-61b3-43ef-a2fc-c68518f8eaf1",
    "fa9224ee-c17b-4be7-aab6-bc73515b1212",
  ];

  const id = await getAuthUserId();
  if (!allowedUsers.includes(id)) {
    return redirect("/");
  }

  const allOrders = await getOrdersByStatus(["Active", "Pending", "Canceled"]);

  return <OrdersTable orders={allOrders} />;
}
