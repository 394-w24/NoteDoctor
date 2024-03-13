/* eslint-disable react-hooks/exhaustive-deps */
import { addMinutes } from "date-fns";
import { initializeApp } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
 // Replace with valid firebase config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/**
 * Retrieves patient data from Firestore using the provided UUID.
 * @param {string} uuid - The UUID (unique identifier) of the patient.
 * @returns {Promise<Object>} - A promise that resolves with the patient data if found, otherwise resolves with undefined.
 */
export const getPatient = async (uuid) => {
  // Construct a reference to the document with the given UUID in the "patients" collection
  const docRef = doc(db, "patients", uuid);

  // Fetch the document snapshot asynchronously
  const docSnap = await getDoc(docRef);

  // Check if the document exists
  if (docSnap.exists()) {
    // If the document exists, log its data and return it
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // If the document does not exist, log a message and return undefined
    // Note: docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};



/**
 * Checks in a patient for an appointment by updating the appointment status and linking it to a room.
 * @param {string} uuid - The UUID (Universally Unique Identifier) of the room where the patient is checking in.
 * @param {DocumentReference} apptref - The reference to the appointment document in Firestore.
 * @returns {boolean} Returns true if the check-in is successful, otherwise false.
 */
export const checkIn = async (uuid, apptref) => {
  // Get a reference to the room document in Firestore
  const docRoom = doc(db, "rooms", uuid);
  
  // Retrieve the room document snapshot
  const docSnap = await getDoc(docRoom);
  
  // Check if the room document exists
  if (docSnap.exists()) {
    // If room exists, update the room document to link to the appointment
    // Merge the appointment data with existing data in the room document
    setDoc(docRoom, { appointment: apptref }, { merge: true });
    
    // Update the appointment document to mark it as checked-in
    // Merge the status data with existing data in the appointment document
    setDoc(apptref, { status: "checkedIn" }, { merge: true });
    
    // Return true to indicate successful check-in
    return true;
  } else {
    // If the room document does not exist, log an error message and return false
    console.log("Wrong Code!");
    return false;
  }
};



/**
 * Resets the status of an appointment to "ArrivedAndWaiting" in Firestore.
 * @param {string} apptId - The ID of the appointment document to reset status for.
 */
export const resetStatus = async (apptId) => {
  // Log the appointment ID
  console.log(apptId);
  
  // Get a reference to the appointment document in Firestore
  const docRef = doc(db, "appointments", apptId);
  
  // Get the appointment document snapshot
  const docSnap = await getDoc(docRef);
  
  // Check if the document exists in Firestore
  if (docSnap.exists()) {
    // Log the appointment data
    console.log(docSnap.data().appointment);
    
    // Update the appointment document with a new status of "ArrivedAndWaiting"
    await setDoc(docRef, { status: "ArrivedAndWaiting" }, { merge: true });
  } else {
    // Log an error if the document does not exist
    console.log("Error updating appt");
  }
};

/**
 * Resets the appointment time for a given appointment ID to a new date and time.
 * 
 * @param {string} apptId - The ID of the appointment to reset.
 * @param {string} newDateTime - The new date and time to set for the appointment in ISO format.
 */
export const resetApptTime = async (apptId, newDateTime) => {
  // Create a reference to the document in the Firestore database with the given appointment ID
  const docRef = doc(db, "appointments", apptId);

  // Get a snapshot of the document with the given reference
  const docSnap = await getDoc(docRef);

  // Check if the document exists
  if (docSnap.exists()) {
    // Log the current appointment data for debugging purposes
    console.log(docSnap.data().appointment);

    // Update the appointment document with the new date and time
    await setDoc(docRef, { date: newDateTime }, { merge: true });
  } else {
    // If the document does not exist, log an error
    console.log("Error updating appt: Document does not exist");
  }
};

/**
 * Checks out a room's appointment by updating its status and resetting appointment and confirmation status.
 * @param {string} uuid - The unique identifier of the room.
 */
export const checkOut = async (uuid) => {
  // Create a reference to the specified room document in the Firestore database.
  const docRoom = doc(db, "rooms", uuid);

  // Fetch the current data snapshot of the room document.
  const docSnap = await getDoc(docRoom);

  // Update the appointment status within the room document to "checkedOut".
  await setDoc(docSnap.data().appointment, { status: "checkedOut" }, { merge: true });

  // Reset the appointment and confirmation status of the room document.
  await setDoc(docRoom, { appointment: null, confirmed: false }, { merge: true });
};


/**
 * Retrieves an appointment from the Firestore database based on the provided UUID.
 * 
 * @param {string} uuid - The UUID of the appointment to retrieve.
 * @returns {Promise<Object>} A promise that resolves to an object representing the appointment data, including the appointment details and the patient information, if found. 
 * If no appointment with the specified UUID is found, the promise resolves to an empty object.
 */
export const getAppt = async (uuid) => {
  const docRef = doc(db, "appointments", uuid);
  const docSnap = await getDoc(docRef);
  let result = {};

  if (docSnap.exists()) {
    result = { ...docSnap.data() };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  result.ref = docSnap.ref;
  const patSnap = await getDoc(docSnap.data().patient);
  // take patient data to result instead of pointer
  result.patient = patSnap.data();
  console.log("Document data:", result);
  return result;
};


/**
 * Update appointment information in the Firestore database.
 *
 * @param {Object} apptInfo - Information of the appointment to be updated.
 * @param {string} apptInfo.uuid - Unique identifier of the appointment.
 * @param {number} apptInfo.height - Height recorded for the appointment.
 * @param {number} apptInfo.weight - Weight recorded for the appointment.
 * @param {number} apptInfo.respRate - Respiratory rate recorded for the appointment.
 * @param {number} apptInfo.pulse - Pulse rate recorded for the appointment.
 * @param {string} apptInfo.bp - Blood pressure recorded for the appointment.
 */
export const updateAppt = async (apptInfo) => {
  const docRef = doc(db, "appointments", apptInfo.uuid);
  // const docSnap = await getDoc(docRef);
  await setDoc(
    docRef,
    {
      height: apptInfo.height,
      weight: apptInfo.weight,
      respRate: apptInfo.respRate,
      pulse: apptInfo.pulse,
      bp: apptInfo.bp,
    },
    { merge: true },
  );
};



/**
 * Adds new issues to an existing appointment in the database.
 *
 * @param {object} apptInfo - Information about the appointment.
 * @param {string[]} newIssues - An array of new issues to add to the appointment.
 */
export const addIssues = async (apptInfo, newIssues) => {
  const docRef = doc(db, "appointments", apptInfo.uuid);
  // const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    issues: arrayUnion(...newIssues),
  });
};



/**
 * Removes a specific issue from an appointment in the Firestore database.
 *
 * @param {object} apptInfo - Information about the appointment.
 * @param {string} apptInfo.uuid - The UUID of the appointment to update.
 * @param {string} issue - The issue to be removed from the appointment.
 */
export const removeIssue = async (apptInfo, issue) => {
  const docRef = doc(db, "appointments", apptInfo.uuid);
  // const docSnap = await getDoc(docRef);
  await updateDoc(docRef, {
    issues: arrayRemove(issue),
  });
};


/**
 * Confirms the room with the specified roomId by updating its 'confirmed' field to true.
 * 
 * @param {string} roomId - The ID of the room to be confirmed.
 */

export const confirmRoom = async (roomId) => {
  const docRef = doc(db, "rooms", roomId);
  await setDoc(docRef, { confirmed: true }, { merge: true });
};


/**
 * Retrieves a caregiver from the Firestore database using the specified UUID.
 * @param {string} uuid - The UUID of the caregiver to retrieve.
 * @returns {Promise<object|null>} A Promise that resolves with the caregiver data if found,
 * or null if no such caregiver exists.
 */
export const getCareGiver = async (uuid) => {
  const docRef = doc(db, "caregivers", uuid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};


/**
 * Asynchronously retrieves the wait time until the next appointment before the given date.
 * 
 * @param {Date} date - The reference date for calculating the wait time.
 * @returns {Promise<Date>} A Promise that resolves to the calculated wait time as a Date object.
 * 
 * NOTE: Function assumes a single doctor in the DB
 */
export const getWaitTime = async (date) => {
  const q = query(
    collection(db, "appointments"),
    orderBy("date", "desc"),
    where("status", "==", "checkedIn"),
    where("date", "<", date),
    limit(1),
  );

  const apptSnapshots = await getDocs(q);
  if (apptSnapshots.docs[0]) {
    const recentAppt = apptSnapshots.docs[0].data();
    return addMinutes(recentAppt.date.toDate(), recentAppt.duration);
  }
  else {
    return date;
  }
};


/**
 * Custom React Hook to subscribe to real-time updates of a Firestore document.
 *
 * @param {Array} docPathArray An array containing the path to the Firestore document.
 * @returns {Object|null} Returns the data fetched from the Firestore document or null if no data is available.
 */
export const useRealTimeDoc = (docPathArray) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("useRealTimeDoc", docPathArray);
    const unsub = onSnapshot(doc(db, ...docPathArray), (doc) => {
      console.log("useRealTimeDoc", { ...doc.data(), id: doc.id });
      setData({ ...doc.data(), id: doc.id });
    });
    return () => unsub();
  }, []);
  return data;
};


/**
 * Custom hook for real-time data fetching from Firestore collection.
 * 
 * @param {Array} collectionPathArray - An array representing the path to the collection in Firestore.
 * @param {Array} whereArr - An array representing the conditions to filter documents by.
 * @param {Array} sortArr - An array representing the sorting conditions for documents.
 * 
 * @returns {Array} Returns an array of documents from the specified collection in real-time.
 */
export const useRealTimeCollection = (
  collectionPathArray,
  whereArr,
  sortArr,
) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const addOns = [];
    if (whereArr) {
      addOns.push(where(...whereArr));
    }
    if (sortArr) {
      addOns.push(orderBy(...sortArr));
    }
    const q = query(collection(db, ...collectionPathArray), ...addOns);
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);
  return data;
};


/**
 * Custom React hook for fetching realtime appointments data.
 * Retrieves appointments data from Firestore collection "appointments" ordered by date,
 * and includes patient details for each appointment.
 *
 * @returns {Array} Array of appointment objects with patient details.
 */
export const useRealtimeAppointments = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("date"));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const appts = [];
      for (const doc of querySnapshot.docs) {
        const patSnap = await getDoc(doc.data().patient);
        appts.push({ ...doc.data(), id: doc.id, patient: patSnap.data() });
      }
      setData(appts);
    });
    return () => unsub();
  }, []);
  return data;
};


/**
 * Custom React Hook to calculate the estimated wait time based on the latest checked-in appointment before a specified date.
 *
 * @param {Date} date - The target date for which the wait time is calculated.
 * @returns {number} The estimated wait time in minutes.
 * 
 * NOTE: Function assumes a single doctor in the DB
 */
export const useRealtimeWaitTime = (date) => {
  const [data, setData] = useState(0);
  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      orderBy("date", "desc"),
      where("status", "==", "checkedIn"),
      where("date", "<", date),
      limit(1),
    );
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const valid = querySnapshot.docs[0].exists;
      if (valid) {
        const lastAppt = querySnapshot.docs[0].data();
        const waitTime = addMinutes(lastAppt.date.toDate(), lastAppt.duration);
        setData(waitTime);
      }
    });
    return () => unsub();
  }, []);
  return data;
};


/**
 * Custom React hook for fetching and subscribing to realtime updates for a specific room.
 * @param {string} roomId - The ID of the room to subscribe to.
 * @returns {object} - The realtime data of the room.
 */
export const useRealtimeRoom = (roomId) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", roomId), async (doc) => {
      const data = doc.data();
      if (!data.appointment) {
        setData({ ...doc.data(), id: doc.id });
        return;
      }
      const apptData = (await getDoc(data.appointment)).data();
      const patData = (await getDoc(apptData.patient)).data();
      const careData = [];
      for (const careRef of apptData.caregivers) {
        const tempCareSnap = await getDoc(careRef);
        const tempCareData = tempCareSnap.data();
        careData.push({ ...tempCareData, id: tempCareSnap.id });
      }
      const res = {
        ...data,
        id: doc.id,
        appointment: {
          ...apptData,
          patient: patData,
          caregivers: careData,
          uuid: data.appointment.id,
        },
      };
      console.log("useRealtimeRoom", res);
      setData(res);
    });
    return () => unsub();
  }, []);
  return data;
};
