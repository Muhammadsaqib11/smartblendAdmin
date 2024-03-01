import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';


type usersState = {
  users: any[]; // Adjust the type according to your customer data structure
  loading: boolean;
  error: string | null;
};

const initialState: usersState = {
  users: [],
  loading: false,
  error: null,
};

type FetchUsersArgs = {
  search?: string;
  date?: string;
  customerEmail?: string;
};



export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ search, date, customerEmail }: { search?: any; date?: any; customerEmail?: any }) => {
    const email=customerEmail
    let usersQuery: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase.firestore().collection('users');
    // debugger
    try {
      const firestore = firebase.firestore();
      // let usersQuery = firestore.collection('users')

      // Apply filters if provided
      if (search) {
        usersQuery = usersQuery.where('name', '>=', search).where('name', '<=', search + '\uf8ff');
      }

      if (date) {
        // Assuming 'orderDate' is the field you want to filter by
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        usersQuery = usersQuery.where('orderDate', '>=', startOfDay).where('orderDate', '<=', endOfDay);
      }

      if (customerEmail) {
        usersQuery = usersQuery.where('email', '==', email);;
      }

      const users = await usersQuery.get();
      const usersData = users.docs.map((doc) => doc.data());

      return usersData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);


// Create a slice for users with reducers and actions
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the asynchronous thunk and the reducer
// export { fetchCustomers };
export default usersSlice.reducer;
