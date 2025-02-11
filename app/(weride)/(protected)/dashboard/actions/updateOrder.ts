"use server";
import { updateOrder } from "../db/orders";

export type UpdateOrder = {
  id?: string;
  status?: string;
  initial_meter_reading?: string;
  final_meter_reading?: string;
};

export async function updateOrderAction({
  id,
  status,
  initial_meter_reading,
  final_meter_reading,
}: UpdateOrder) {
  const data = await updateOrder({
    id,
    status,
    initial_meter_reading,
    final_meter_reading,
  });
  return { data, error: null };
}
