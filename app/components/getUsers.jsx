'use client'
import React, { useState } from 'react';
import axios from 'axios'

const GetUsersComponent = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {withCredentials: true});
      return response.data;
    } catch (error) {
      return error.response?.status ||500;
    }
  };


  return (
    <div>
      <h1>Get Users</h1>
      <div>
        <h2>Get All Users</h2>
        <button onClick={getUsers}>Get Users</button>
      </div>
    </div>
  );
};

export default GetUsersComponent;
