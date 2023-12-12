import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseApi1, setResponseApi1] = useState('');
  const [responseApi2, setResponseApi2] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make request to the first API
      const response1 = await fetch('https://nodebackend-for-dpapp.azurewebsites.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response1.ok) {
        const data1 = await response1.json();
        setResponseApi1(`API 1 Login successful: ${JSON.stringify(data1)}`);
        navigate('/normaluser');
        return;
      } else {
        const errorData1 = await response1.json().catch(() => ({})); // Catch JSON parsing error
        setResponseApi1(`API 1 Login failed: ${JSON.stringify(errorData1)}`);
      }
  
      // Make request to the second API
      const response2 = await fetch('https://nodebackend-for-dpapp.azurewebsites.net/mla/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response2.ok) {
        const data2 = await response2.json();
        console.log(data2);
       
        const constituencyData=data2.mla.constituency
        setResponseApi2(`API 2 Login successful: ${JSON.stringify(data2.message)}`);
        navigate(`/mlagrievances/${constituencyData}`);
      } else {
        const errorData2 = await response2.json().catch(() => ({})); // Catch JSON parsing error
        setResponseApi2(`API 2 Login failed: ${JSON.stringify(errorData2)}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setResponseApi1('Error during login');
      setResponseApi2('Error during login');
    }
  };
  
  return (
    <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <div>
        <strong>Response from API 1:</strong> {responseApi1}
      </div>
      <div>
        <strong>Response from API 2:</strong> {responseApi2}
      </div>
    </div>
  );
};

export default Login;
