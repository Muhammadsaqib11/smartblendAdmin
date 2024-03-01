
import { request } from './request';
import {firebase} from '../firebase/firebase';
import { notification } from 'antd';
// export const apiLogin = async (data) => {
//   const loginUrl = 'https://smart-blend-930254fd4077.herokuapp.com/admin/validate';

//   try {
//     const { username, password } = data;
//     // Sign in with email and password
//     // const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

//     const userCredential:any = await fetch(loginUrl, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password })
//   });

// //   if (!userCredential.ok) {
// //     throw new Error('Failed to login. Please try again.');
// // }

// const userData = await userCredential.json();



//     // Get user information
//     const user = userData?.data;
//     console.log("userData", user);

    
//     // Example: You can store user information in localStorage
//     localStorage.setItem('t', user.access_token || '');
    
//     // Save or update the current login date in Firestore
//     // const userRef = firebase.firestore().collection('users').doc(user.uid);
//     // await userRef.update({ lastLoginDate: new Date() });

//     notification.success({ message: 'User logged in successfully!' });

//     return user;
//   } catch (error) {
//     notification.error({ message: "username doesnt exist" });

//     const err = JSON.parse(error.message);
//     const errorMessage = err.error.message.replace(/_/g, ' ').toLowerCase();
//     const capitalizedMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

//     notification.error({ message: capitalizedMessage });

//     console.error('Firebase login error:', err);

//     // Return false if login fails
//     return false;
//   }
// };

export const apiLogin = async (data) => {
  const loginUrl = 'https://smart-blend-930254fd4077.herokuapp.com/admin/validate';

  try {
    const { username, password } = data;
    const userCredential = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!userCredential.ok) {
      throw new Error('Failed to login. Please try again.'); // Adjusted error message for registration failure
    }

    const userData = await userCredential.json();
    const user = userData?.data;
    console.log("userData", user);

    localStorage.setItem('t', user.access_token || '');
    notification.success({ message: 'User Login successfully!' });

    return user;
  } catch (error) {
    console.log("error", error);

    let errorMessage = "Failed to Login. user not Exist."; // Default error message

    if (error instanceof Error && error.message) {
      // Check if the error message matches the expected format
      const errorMessagePattern = /^Failed to (\w+)\. User already Exist\.$/;
      const match = error.message.match(errorMessagePattern);
      if (match) {
        errorMessage = error.message;
      }
    }

    console.error('Registration error:', errorMessage);
    notification.error({ message: errorMessage });


    // Return false if registration fails
    return false;
  }
};
export const apiRegister = async (data) => {
  const loginUrl = 'https://smart-blend-930254fd4077.herokuapp.com/admin/register';

  try {
    const { username, password } = data;
    const userCredential = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!userCredential.ok) {
      throw new Error('Failed to register. Please try again.'); // Adjusted error message for registration failure
    }

    const userData = await userCredential.json();
    const user = userData?.data;
    console.log("userData", user);

    localStorage.setItem('t', user.access_token || '');
    notification.success({ message: 'User registered successfully!' });

    return user;
  } catch (error) {
    console.log("error", error);

    let errorMessage = "Failed to register. user Already Exist."; // Default error message

    if (error instanceof Error && error.message) {
      // Check if the error message matches the expected format
      const errorMessagePattern = /^Failed to (\w+)\. User already Exist\.$/;
      const match = error.message.match(errorMessagePattern);
      if (match) {
        errorMessage = error.message;
      }
    }

    console.error('Registration error:', errorMessage);
    notification.error({ message: errorMessage });


    // Return false if registration fails
    return false;
  }
};
export const apiUserList = async () => {
  const loginUrl = 'https://smart-blend-930254fd4077.herokuapp.com/admin/users-all';

  try {
  
    const userCredential = await fetch(loginUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!userCredential.ok) {
      throw new Error('Failed to Fetch. Please try again.'); // Adjusted error message for registration failure
    }

    const userData = await userCredential.json();
    const user = userData?.data;
    console.log("userData", user);

    localStorage.setItem('users', userData || '');
    // notification.success({ message: 'User registered successfully!' });

    return user;
  } catch (error) {
    console.log("error", error);

    let errorMessage = "Failed to fetch."; // Default error message

    if (error instanceof Error && error.message) {
      // Check if the error message matches the expected format
      const errorMessagePattern = /^Failed to (\w+)\. User already Exist\.$/;
      const match = error.message.match(errorMessagePattern);
      if (match) {
        errorMessage = error.message;
      }
    }

    console.error('Registration error:', errorMessage);
    notification.error({ message: errorMessage });


    // Return false if registration fails
    return false;
  }
};



/** 登出接口 */
export const apiLogout = (data) => request('post', '/user/logout', data);
