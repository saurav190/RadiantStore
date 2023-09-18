import React from 'react';
interface current{
    currentStep:number
}
const OrderProgress:React.FC<current> = ({ currentStep }) => {
  const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

  return (
    <div className="flex justify-between items-center mb-4">
      {steps.map((step, index) => (
        <div key={step} className={`text-center ${index < currentStep ? 'text-green-500' : 'text-gray-500'}`}>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
            {index + 1}
          </div>
          <p className="mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderProgress;
