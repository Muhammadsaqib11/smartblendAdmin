import firebase from 'firebase';



const firestore = firebase.firestore();
const auth = firebase.auth();

export const addRecordToFirestore = async (collectionName, values) => {
  try {
    const customersCollection = firestore.collection(collectionName);
    const customerDocRef = await customersCollection.add(values);
    const uid = customerDocRef.id;
    await customerDocRef.update({ uid });
    return uid;
  } catch (error) {
    console.error(`Error adding ${collectionName} to Firestore:`, error);
    throw error;
  }
};
export const createUserAndSaveToFirestore = async (email, password, additionalValues) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    // Save additional values to the 'users' collection
    const usersCollection = firestore.collection('users');
    const userDocRef = await usersCollection.doc(user.uid).set({
      uid: user.uid,
      ...additionalValues,
    });

    return user.uid;
  } catch (error) {
    console.error('Error creating user and saving to Firestore:', error);
    throw error;
  }
};


