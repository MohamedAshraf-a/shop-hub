import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    total: 149.99,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    total: 79.99,
    status: "pending",
    items: 1,
  },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-blue-500" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-500" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-500" },
};

export default function Orders() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">My Orders</h1>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const StatusIcon = statusConfig[order.status].icon;
          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className="bg-gold text-foreground border-0">
                      {order.items} items
                    </Badge>
                    <Badge
                      className={`${statusConfig[order.status].color} text-white border-0`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gold">
                      ${order.total}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No orders yet</h3>
          <p className="text-muted-foreground mt-1">Start shopping to see your orders here</p>
        </div>
      )}
    </motion.div>
  );
}