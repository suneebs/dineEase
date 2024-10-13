import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
  "Starters",
  "Main",
  "Juices",
  "Beverages",
  "Sides",
  "Salads",
  "Desserts",
  "Burgers",
  "Sandwiches"
];

const EditMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuCollection = collection(db, 'menu');
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuList);
    };

    fetchMenuItems();
  }, []);

  // Handle input changes for editable fields
  const handleInputChange = (e, field, id) => {
    setUpdatedFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: e.target.value,
      },
    }));
  };

  // Save changes to Firestore
  const handleSaveChanges = async (id) => {
    const updatedItem = updatedFields[id];
    const docRef = doc(db, 'menu', id);
    await updateDoc(docRef, {
      name: updatedItem.name,
      price: updatedItem.price,
      description: updatedItem.description,
      category: updatedItem.category, // Update category
    });

    const updatedItems = menuItems.map((item) =>
      item.id === id
        ? { ...item, name: updatedItem.name, price: updatedItem.price, description: updatedItem.description, category: updatedItem.category }
        : item
    );
    setMenuItems(updatedItems);
    setEditItemId(null);
  };

  // Delete menu item
  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, 'menu', id));
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Add new menu item
  const handleAddItem = async (e) => {
    e.preventDefault();

    const itemExists = menuItems.some(item => item.name.toLowerCase() === newItem.name.toLowerCase());

    if (itemExists) {
      setErrorMessage('An item with this name already exists.');
      return;
    }

    setErrorMessage('');

    if (newItem.name && newItem.price && newItem.description && newItem.category) {
      const docRef = await addDoc(collection(db, 'menu'), {
        name: newItem.name,
        price: parseFloat(newItem.price),
        description: newItem.description,
        category: newItem.category, // Add category
      });
      setMenuItems([...menuItems, { id: docRef.id, ...newItem }]);
      setNewItem({ name: '', price: '', description: '', category: '' }); // Reset form fields
    }
  };

  // Filter menu items based on search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='flex justify-center font-bold p-5'>
        <h2>Edit Menu</h2>
      </div>

      <div className='flex justify-center text-xl mb-4'>
        <p>Total Items: {menuItems.length}</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="bg-slate-100 p-5">
        <h3>Add New Item</h3>

        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAddItem} className="space-y-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Item Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Item Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Button type="submit" className="bg-green-400 w-full">
            Add Item
          </Button>
        </form>
      </div>

      <div className="bg-slate-100 grid grid-cols-2 gap-8 pt-10 p-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              {/* You can add an image or other content here */}
            </CardHeader>
            <CardContent>
              {editItemId === item.id ? (
                <>
                  <input
                    type="text"
                    value={updatedFields[item.id]?.name || item.name}
                    onChange={(e) => handleInputChange(e, 'name', item.id)}
                    className="border p-1 w-full"
                  />
                  <textarea
                    value={updatedFields[item.id]?.description || item.description}
                    onChange={(e) => handleInputChange(e, 'description', item.id)}
                    className="border p-1 w-full mt-2"
                  />
                  <input
                    type="number"
                    value={updatedFields[item.id]?.price || item.price}
                    onChange={(e) => handleInputChange(e, 'price', item.id)}
                    className="border p-1 w-full mt-2"
                  />
                  <select
                    value={updatedFields[item.id]?.category || item.category}
                    onChange={(e) => handleInputChange(e, 'category', item.id)}
                    className="border p-1 w-full mt-2"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardDescription>₹{item.price}</CardDescription>
                  <CardDescription>Category: {item.category}</CardDescription> {/* Display category */}
                </>
              )}
            </CardContent>
            <CardFooter className='flex justify-between'>
              {editItemId === item.id ? (
                <>
                  <Button onClick={() => handleSaveChanges(item.id)} className='bg-green-400'>
                    Save
                  </Button>
                  <Button onClick={() => setEditItemId(null)} className='bg-red-400 ml-2'>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => {
                    setEditItemId(item.id);
                    setUpdatedFields((prev) => ({
                      ...prev,
                      [item.id]: {
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        category: item.category, // Set category for editing
                      },
                    }));
                  }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteItem(item.id)} className='bg-red-400 ml-2'>
                    Delete
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EditMenu;
