"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateOrderAction } from "../actions/updateOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timer, Search } from "lucide-react";
import toast from "react-hot-toast";

type Order = {
  id: string;
  bike_id: { name: string };
  renter_id: { name: string };
  status: string;
  initial_meter_reading: string;
  finalReading: string;
  requestTime: string;
};

type Props = {
  orders: Order[];
};

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Canceled", label: "Canceled" },
] as const;

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-800 hover:bg-green-100",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Canceled: "bg-red-100 text-red-800 hover:bg-red-100",
  default: "bg-gray-100 text-gray-800 hover:bg-gray-100",
} as const;

export default function OrdersTable({ orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadgeVariant = (status: string) => {
    return (
      STATUS_STYLES[status as keyof typeof STATUS_STYLES] ||
      STATUS_STYLES.default
    );
  };

  const handleOrderUpdate = (field: string, value: string) => {
    setSelectedOrder((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      console.log(selectedOrder);
      const response = await updateOrderAction(selectedOrder);
      if (!response.error) {
        toast.success("Order updated successfully");
      } else {
        toast.error("Failed to update order");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.bike_id.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.renter_id.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Orders Dashboard
          </h1>
          <div className="relative w-64">
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {["all", ...STATUS_OPTIONS.map((s) => s.value)].map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium">Order</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Vehicle
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Customer
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Time Left
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="font-medium">
                              {order.id.split("-")[0]}
                            </div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {order.bike_id.name}
                            </div>
                            <div className="text-sm text-gray-500 sm:hidden">
                              {order.renter_id.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.bike_id.name}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {order.renter_id.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeVariant(order.status)}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Timer className="h-4 w-4" />
                              20
                            </div>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  Manage
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Manage Order {order.id.split("-")[0]}
                                  </DialogTitle>
                                </DialogHeader>

                                <form onSubmit={handleSubmit}>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Status
                                      </label>
                                      <Select
                                        defaultValue={order.status}
                                        onValueChange={(value) =>
                                          handleOrderUpdate("status", value)
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {STATUS_OPTIONS.map((status) => (
                                            <SelectItem
                                              key={status.value}
                                              value={status.value}
                                            >
                                              {status.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Initial Meter Reading
                                      </label>
                                      <Input
                                        type="number"
                                        placeholder="Enter initial reading"
                                        defaultValue={
                                          order.initial_meter_reading
                                        }
                                        onChange={(e) =>
                                          handleOrderUpdate(
                                            "initial_meter_reading",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Final Meter Reading
                                      </label>
                                      <Input
                                        type="number"
                                        placeholder="Enter final reading"
                                        defaultValue={order.finalReading}
                                        onChange={(e) =>
                                          handleOrderUpdate(
                                            "final_meter_reading",
                                            e.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="submit">
                                        Save changes
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
