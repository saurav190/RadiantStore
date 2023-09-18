import React,{useState} from 'react'
import OrderProgress from '../components/OrderProgress';

const OrderPro = () => {
    const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order Progress</h1>
      <OrderProgress currentStep={currentStep - 1} />
      <button
        onClick={handleNextStep}
        disabled={currentStep >= 4}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${currentStep >= 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        Next Step
      </button>
    </div>
  )
}

export default OrderPro