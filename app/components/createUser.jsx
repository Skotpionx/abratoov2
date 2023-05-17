// 'use client'
// import React, { useState } from 'react';
// import axios from 'axios';


// const CreateUser = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUsers = async () => {
//         const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
//         try {
//           const response = await axios.get(`${backendURL}/api/users`);
//           console.log(response.data);
//           setUsers(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };

      
//   const [formData, setFormData] = useState({
//     nombre: '',
//     edad: '',
//     telefono: '',
//     direccion: '',
//     imagenes: [],
//     aniosExperiencia: '',
//     pseudonimo: '',
//     valoracion: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
//       const response = await axios.post(`${backendURL}/api/users`, formData);
//       if (response.status === 201) {
//         alert('User created successfully');
//         setFormData({
//           nombre: '',
//           edad: '',
//           telefono: '',
//           direccion: '',
//           imagenes: [],
//           aniosExperiencia: '',
//           pseudonimo: '',
//           valoracion: ''
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Nombre:
//         <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
//       </label>
//       <label>
//         Edad:
//         <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
//       </label>
//       <label>
//         Teléfono:
//         <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
//       </label>
//       <label>
//         Dirección:
//         <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
//       </label>
//       <label>
//         Años de Experiencia:
//         <input type="number" name="aniosExperiencia" value={formData.aniosExperiencia} onChange={handleChange} />
//       </label>
//       <label>
//         Pseudónimo:
//         <input type="text" name="pseudonimo" value={formData.pseudonimo} onChange={handleChange} />
//       </label>
//       <label>
//         Valoración:
//         <input type="number" name="valoracion" value={formData.valoracion} onChange={handleChange} />
//       </label>
//       <button type="submit">Crear Usuario</button>
//       <button onClick={fetchUsers}>Mostrar Usuarios</button>
//     </form>
//   );
// };

// export default CreateUser;
