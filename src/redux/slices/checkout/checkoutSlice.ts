
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../../utils/types';

// Define the structure of form values using TypeScript interface
interface FormValues {
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhoneNumber: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;

  cartItems: CartItem[];
  grandTotal: number;
  subtotal:number;
  discount:number;
  cartItem: CartItem[];
}

// Define the initial state for the checkout form
const initialState: FormValues = {
  billingFirstName: '',
  billingLastName: '',
  billingEmail: '',
  billingPhoneNumber: '',
  billingAddressLine1: '',
  billingAddressLine2: '',
  billingCity: '',
  billingState: '',
  billingPostalCode: '',
  billingCountry: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  cardHolderName: '',
 
  cartItems: [],
  grandTotal: 0,
  subtotal:0,
  discount:0,
  cartItem: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Action to update form values
    FormValues: (state, action: PayloadAction<FormValues>) => {
      Object.assign(state, action.payload);
    },
    
    CartItems: (state, action: PayloadAction<CartItem>) => {
      state.cartItem.unshift(action.payload);
    },
    // Add other reducers for additional actions here
  },
});

export const { FormValues, CartItems} = checkoutSlice.actions;

export default checkoutSlice.reducer;