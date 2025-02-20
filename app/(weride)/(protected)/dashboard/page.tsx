import { getAuthUserId, getOrdersByStatus } from "@/lib/supabase/queries";
import OrdersTable from "@/features/dashboard/components/orders-table";
import { redirect } from "next/navigation";
import { getAuthUserEmail } from "@/features/dashboard/db/orders";

// make a object case convertor
export default async function AdminDashboard() {
  const allowedUsers = [
    "sankalp.ace22@sot.pdpu.ac.in",
    "vinit.tce22@sot.pdpu.ac.in",
    "nishit.bce22@sot.pdpu.ac.in",
  ];

  const id = await getAuthUserEmail();
  if (!allowedUsers.includes(id)) {
    return redirect("/");
  }

  const allOrders = await getOrdersByStatus([
    "Active",
    "Pending",
    "Canceled",
    "Completed",
  ]);

  return <OrdersTable orders={allOrders} />;
}
