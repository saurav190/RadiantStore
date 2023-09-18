import React from "react";

interface PriceSidebarProps {
  cartItems: Array<{
    quantity: number;
    price: number;
  }>;
}

const PriceSidebar: React.FC<PriceSidebarProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
      <div className="flex flex-col bg-white rounded-sm shadow">
        <h1 className="px-6 py-3 border-b font-medium text-gray-500">
          PRICE DETAILS
        </h1>

        <div className="flex flex-col gap-4 p-6 pb-3">
          <p className="flex justify-between">
            Price ({cartItems.length} item){" "}
            <span>₹{totalPrice.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            Delivery Charges <span className="text-primary-green">FREE</span>
          </p>
          <p className="flex justify-between">
            Total Quantity
            <span>{totalQuantity}</span>
          </p>
          <div className="border border-dashed"></div>
          <p className="flex justify-between text-lg font-medium">
            Total Amount <span>₹{totalPrice.toLocaleString()}</span>
          </p>
          <div className="border border-dashed"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceSidebar;
