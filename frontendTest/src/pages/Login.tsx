import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username.trim(), password)) {
      navigate('/');
    } else {
      setError('Invalid username or password. Admin access only.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="minecraft-border bg-card p-8 w-full max-w-sm">
          <h1 className="font-pixel text-sm text-foreground text-center mb-2">Admin Login</h1>
          <p className="font-pixel-body text-lg text-muted-foreground text-center mb-6">
            Only admins can access this area.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              required
              maxLength={50}
              className="px-3 py-2 bg-background border-2 border-border font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              required
              className="px-3 py-2 bg-background border-2 border-border font-pixel-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
            />
            {error && (
              <p className="font-pixel text-[8px] text-destructive text-center">{error}</p>
            )}
            <button type="submit" className="minecraft-btn px-4 py-3 font-pixel text-[9px] text-foreground">
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
