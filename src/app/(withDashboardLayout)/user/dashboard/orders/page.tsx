/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { deleteUserOrder, getMyOrders } from "@/services/order.user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [canceling, setCanceling] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getMyOrders();
      console.log(res.data);
      setOrders(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }

    // console.log(order);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openCancelModal = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;
    setCanceling(true);

    try {
      await deleteUserOrder(selectedOrder.id);
      toast.success("Order canceled successfully");
      setOrders((prev) =>
        prev.filter((order) => order.id !== selectedOrder.id),
      );
      setModalOpen(false);
      setSelectedOrder(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel order");
    } finally {
      setCanceling(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (orders.length === 0)
    return (
      <p className="text-center text-muted-foreground mt-10">
        You have no orders yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {orders.map((order: any) => (
          <Card
            key={order.id}
            className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition duration-300"
          >
            {/* Card Header */}
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Order #{order.id.slice(0, 8)}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Total: ৳{order.totalPrice}
                </p>
              </div>

              <Badge
                variant={
                  order.status === "PENDING"
                    ? "secondary"
                    : order.status === "SHIPPED"
                      ? "default"
                      : "outline"
                }
                className="uppercase px-3 py-1 text-xs font-medium"
              >
                {order.status}
              </Badge>
            </CardHeader>

            {/* Card Items */}
            <CardContent className="pt-2">
              <div className="space-y-2 mb-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-600">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {order.status === "PENDING" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => openCancelModal(order)}
                  className="w-full"
                >
                  Cancel Order
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cancel Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            Are you sure you want to cancel order #
            {selectedOrder?.id.slice(0, 8)}? This action cannot be undone.
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={canceling}
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={canceling}
            >
              {canceling ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyOrdersPage;
