//  This is used for adding imgurl field in the documents of the firebase collections!
import React from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const UpdateDocumentsButton = () => {
  
  // Function to update existing Firestore documents
  const updateExistingDocuments = async () => {
    const menuCollection = collection(db, 'menu');
    const menuSnapshot = await getDocs(menuCollection);
    const menuItems = menuSnapshot.docs;

    menuItems.forEach(async (menuItem) => {
      const menuItemRef = doc(db, 'menu', menuItem.id);

      // Add the `imageUrl` field if it doesn't exist
      await updateDoc(menuItemRef, {
        imageUrl: "", // Empty string or default image URL
      });
    });

    alert('Documents updated with the imageUrl field.');
  };

  return (
    <div>
      <button onClick={updateExistingDocuments} className="bg-blue-500 text-white p-2 rounded">
        Update Documents
      </button>
    </div>
  );
};

export default UpdateDocumentsButton;
