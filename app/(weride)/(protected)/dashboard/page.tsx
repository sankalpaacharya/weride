"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  // Add more orders as needed
];

export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Orders Dashboard
          </h1>
          <div className="relative w-64">
            <Input placeholder="Search orders..." className="pl-8" />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="canceled">Canceled</TabsTrigger>
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
                      {orders.map((order: any) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {order.vehicle}
                            </div>
                            <div className="text-sm text-gray-500 sm:hidden">
                              {order.customer}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.vehicle}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {order.customer}
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
                              {order.timeLeft}
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
                                    Manage Order {order.id}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                      Status
                                    </label>
                                    <Select defaultValue={order.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">
                                          Active
                                        </SelectItem>
                                        <SelectItem value="pending">
                                          Pending
                                        </SelectItem>
                                        <SelectItem value="canceled">
                                          Canceled
                                        </SelectItem>
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
                                      defaultValue={order.initialReading}
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
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save changes</Button>
                                </DialogFooter>
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
