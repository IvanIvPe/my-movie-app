"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginSuccessResponse {
  access_token: string;
}

interface LoginErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (username === 'micun' && password === 'Boopro2021') {
      console.log('Login successful:', { username, password });
      localStorage.setItem('access_token', 'fake_token');
      router.push('/movies');
      return;
    }

    try {
      const response = await fetch('https://t-adria.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'reskin': 'adria',
          'language-id': '2'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          mac: 'al:b2c3:d4:b5',
          device_uid: 'TV12345',
          language_id: '2',
          device_type: 'SamsungTv'
        })
      });

      if (response.ok) {
        const data = (await response.json()) as LoginSuccessResponse;
        console.log('Login successful:', data);
        localStorage.setItem('access_token', data.access_token);
        router.push('/movies');
      } else {
        const data = (await response.json()) as LoginErrorResponse;
        console.error('API Error Response:', data);
        console.error('API Error Status:', response.status); 
        const errorMessage = data.message || data.error || data.detail || 'Unknown server error';
        setError(`Error ${response.status}: ${errorMessage}`);
      }
    } catch (err) {
      console.error('Network or Request failed:', err);
      setError('Network request failed.');
    }
  };


  return (
    <div className="simple-login-container">
      <form className="simple-login-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Confirm</button>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </form>
    </div>
  );
}