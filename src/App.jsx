import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [updateItemId, setUpdateItemId] = useState('');
  const [updateItemValue, setUpdateItemValue] = useState('');

  // Función para obtener todos los documentos
  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(items);
  };

  // Función para agregar un nuevo documento
  const addItem = async () => {
    if (newItem.trim() !== '') {
      await addDoc(collection(db, "items"), { name: newItem });
      setNewItem('');
      getItems(); // Recarga la lista de items
    }
  };

  // Función para actualizar un documento
  const updateItem = async () => {
    const itemRef = doc(db, "items", updateItemId);
    await updateDoc(itemRef, { name: updateItemValue });
    setUpdateItemId('');
    setUpdateItemValue('');
    getItems(); // Recarga la lista de items
  };

  // Función para eliminar un documento
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
    getItems(); // Recarga la lista de items
  };

  // Cargar los items cuando el componente se monta
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <h1>Lista de Items</h1>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Nuevo Item"
        />
        <button onClick={addItem}>Agregar</button>
      </div>

      <div>
        <input
          type="text"
          value={updateItemId}
          onChange={(e) => setUpdateItemId(e.target.value)}
          placeholder="ID para actualizar"
        />
        <input
          type="text"
          value={updateItemValue}
          onChange={(e) => setUpdateItemValue(e.target.value)}
          placeholder="Nuevo nombre"
        />
        <button onClick={updateItem}>Actualizar</button>
      </div>

      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
