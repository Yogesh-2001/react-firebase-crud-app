import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
     <div className="d-flex col-12 justify-center">
     <input
      type='text'
      className="form-control col-5 mx-4 my-3"
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        className="form-control col-5 mx-4 my-3"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
     </div>

      <button onClick={createUser}> Create User</button>
      <table className="table my-5">
  <thead className="thead-dark">
    <tr>
      <th className="col-3">Id</th>
      <th  className="col-2">First_Name</th>
      <th  className="col-1">Age</th>
      <th className="col-6">Actions</th>
    </tr>
  </thead>
  <tbody>

    {users.map((user) => {
        return (
          <tr>
          <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td><button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
            </td>
            
          </tr>
        );
      })}

  </tbody>
</table>
    </div>
  );
}

export default App;
