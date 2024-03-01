import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout, apiRegister, apiUserList } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
import firebase from 'firebase';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async (dispatch, getState) => {
    const result = await apiLogin(payload);
console.log("result", result)
    if (result) {
      // localStorage.setItem('t', result.uid);
      // localStorage.setItem('username', result.username);

      // Fetch and set user profile during login
      // dispatch(fetchUserProfile(result.uid)as any);

      return true;
    }

    return false;
  };
});;
export const RegisterAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async (dispatch, getState) => {
    const result = await apiRegister(payload);
console.log("result", result)
    if (result) {
      // localStorage.setItem('t', result.uid);
      // localStorage.setItem('username', result.username);

      // Fetch and set user profile during login
      // dispatch(fetchUserProfile(result.uid)as any);

      return true;
    }

    return false;
  };
});;
export const UserListAsync = createAsyncAction(() => {
  return async (dispatch, getState) => {
    const result = await apiUserList();
    console.log("result", result);
    if (result) {
      // localStorage.setItem('t', result.uid);
      // localStorage.setItem('username', result.username);

      // Fetch and set user profile during login
      // dispatch(fetchUserProfile(result.uid)as any);

      return true;
    }

    return false;
  };
});

export const fetchUserProfile = (uid: any) => {
  return async (dispatch: Dispatch) => {
    const userProfile = await apiUserList();
    if (userProfile){

      // dispatch(
      //   setUserItem({
      //     logged: true,
      //     // Add other user information from the profile if available
      //     // Example: name, age, etc.
      //     ...(userProfile && { userProfile }),
      //   }),
      // );
    }
  };
};
// const getUserProfileById = async (uid:any) => {
  
//   try {
//     // Assuming you have a 'users' collection in Firestore
//     const userDoc = await firebase.firestore().collection('users').doc(uid).get();

//     if (userDoc.exists) {
//       // Extract user data from the document
//       const userData = userDoc.data();
//       return userData;
//     } else {
//       console.error('User not found');
//       return null;
//     }
//   } catch (error:any) {
//     console.error('Error fetching user profile:', error.message);
//     return null;
//   }
// };



export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! });

    if (status) {
      // Get the email and password from local storage before clearing
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      const rememberMe = localStorage.getItem('rememberMe');

      // Clear all items from local storage
      localStorage.clear();

      // Restore the email and password back to local storage
      if (email !== null) {
        localStorage.setItem('email', email); 
      }
      if (rememberMe !== null) {

        localStorage.setItem('rememberMe', rememberMe);

      }


      if (password !== null) {
        localStorage.setItem('password', password);
      }

      dispatch(
        setUserItem({
          logged: false,
          userProfile:null
        }),
      );

      return true;
    }

    return false;
  };
};

