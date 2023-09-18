
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 export interface FormValues {
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
  
}
interface ShippingState {
  shippingInfo: FormValues;
}


const initialState: ShippingState = {
  shippingInfo: {
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
  },
};

const ShippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    shippingInfoAdd: (state, action: PayloadAction<ShippingState>) => {
      state.shippingInfo  = action.payload.shippingInfo;
    },
  },
});

export const { shippingInfoAdd } = ShippingSlice.actions;
export default ShippingSlice.reducer;
