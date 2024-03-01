import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';


type CustomersState = {
  customers: any[]; // Adjust the type according to your customer data structure
  loading: boolean;
  error: string | null;
};

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
};

type FetchCustomersArgs = {
  search?: string;
  date?: string;
  customerEmail?: string;
};



export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async ({ search, date, customerEmail }: { search?: any; date?: any; customerEmail?: any }) => {
    const email=customerEmail
    let customersQuery: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase.firestore().collection('customers');
    // debugger
    try {
      const firestore = firebase.firestore();
      // let customersQuery = firestore.collection('customers')

      // Apply filters if provided
      if (search) {
        customersQuery = customersQuery.where('name', '>=', search).where('name', '<=', search + '\uf8ff');
      }

      if (date) {
        // Assuming 'orderDate' is the field you want to filter by
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        customersQuery = customersQuery.where('orderDate', '>=', startOfDay).where('orderDate', '<=', endOfDay);
      }

      if (customerEmail) {
        customersQuery = customersQuery.where('email', '==', email);;
      }

      const customers = await customersQuery.get();
      const customersData = customers.docs.map((doc) => doc.data());

      return customersData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);


// Create a slice for customers with reducers and actions
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the asynchronous thunk and the reducer
// export { fetchCustomers };
export default customersSlice.reducer;
