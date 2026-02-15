import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const AdminRequests = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <h1 className="font-pixel text-lg text-foreground text-center mb-6">📬 User Requests</h1>

        <div className="minecraft-border bg-card p-6 text-center">
          <p className="font-pixel-body text-xl text-muted-foreground">
            No pending requests yet. User suggestions submitted via the Villager will appear here.
          </p>
          <p className="font-pixel-body text-lg text-muted-foreground mt-2">
            🚧 Connect a backend to persist and manage requests.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminRequests;
