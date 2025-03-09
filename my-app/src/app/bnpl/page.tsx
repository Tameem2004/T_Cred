"use client";
import React, { useState } from 'react';

interface BNPLFormData {
  price: number;
  upfrontPayment: number;
  remainingBalance: number;
  installmentDuration: number;
}

interface BNPLFormProps {
  onSubmit: (formData: BNPLFormData) => void;
}

const BNPLForm: React.FC<BNPLFormProps> = ({ onSubmit }) => {
  const [price, setPrice] = useState<number>(0);
  const [upfrontPayment, setUpfrontPayment] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [installmentDuration, setInstallmentDuration] = useState<number>(3); // Default duration: 3 months

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPrice(value);
    updateRemainingBalance(value, upfrontPayment);
  };

  const handleUpfrontPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setUpfrontPayment(value);
    updateRemainingBalance(price, value);
  };

  const handleInstallmentDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstallmentDuration(parseInt(event.target.value, 10));
  };

  const updateRemainingBalance = (price: number, upfrontPayment: number) => {
    setRemainingBalance(price - upfrontPayment);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the inputs
    if (price <= 0 || upfrontPayment <= 0 || upfrontPayment > price) {
      alert('Invalid input values.');
      return;
    }

    const formData: BNPLFormData = {
      price,
      upfrontPayment,
      remainingBalance,
      installmentDuration,
    };

    onSubmit(formData); // Send data to the parent component
  };

  return (
    <div className="min-h-screen bg-[#13082A] text-white flex justify-center items-center py-8">
      <div className="bg-[#1D1F37] p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Buy Now, Pay Later (BNPL) Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="price" className="block text-lg font-medium mb-2">NftID</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              placeholder="Enter NftID"
              min="0"
              className="w-full p-3 bg-[#2A2B4C] text-white rounded-md placeholder-gray-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="upfrontPayment" className="block text-lg font-medium mb-2">Upfront Payment ($)</label>
            <input
              type="number"
              id="upfrontPayment"
              value={upfrontPayment}
              onChange={handleUpfrontPaymentChange}
              placeholder="Enter upfront payment"
              min="0"
              className="w-full p-3 bg-[#2A2B4C] text-white rounded-md placeholder-gray-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="installmentDuration" className="block text-lg font-medium mb-2">Installment Duration (months)</label>
            <input
              type="number"
              id="installmentDuration"
              value={installmentDuration}
              onChange={handleInstallmentDurationChange}
              min="1"
              placeholder="Enter installment duration"
              className="w-full p-3 bg-[#2A2B4C] text-white rounded-md placeholder-gray-300 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium">Remaining Balance: ${remainingBalance.toFixed(2)}</p>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#3E4B9E] rounded-md text-white font-bold hover:bg-[#2F3A73] focus:outline-none"
          >
            Submit BNPL Agreement
          </button>
        </form>
      </div>
    </div>
  );
};

const ParentComponent: React.FC = () => {
  const handleSubmit = (formData: BNPLFormData) => {
    console.log('Form Data Submitted:', formData);
    // Handle the form submission here (e.g., send the data to an API or update the state)
  };

  return (
    <div>

      {/* Pass the handleSubmit function to the child component */}
      <BNPLForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ParentComponent;
