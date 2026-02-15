import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const isArchive = location.pathname === '/archive' || location.pathname.startsWith('/language/');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full">
      <div className="bg-minecraft-dirt minecraft-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-pixel text-primary-foreground text-sm md:text-base tracking-wide hover:text-accent transition-colors">
            LinguaCraft
          </Link>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <>
                <Link
                  to={isArchive ? '/' : '/archive'}
                  className="minecraft-btn px-3 py-2 font-pixel text-[9px] md:text-xs text-foreground"
                >
                  {isArchive ? 'World View' : 'Archive'}
                </Link>
                <Link
                  to="/admin/requests"
                  className="minecraft-btn px-3 py-2 font-pixel text-[9px] md:text-xs text-foreground"
                >
                  My Requests
                </Link>
                <Link
                  to="/admin/manage"
                  className="minecraft-btn px-3 py-2 font-pixel text-[9px] md:text-xs text-foreground"
                >
                  Manage
                </Link>
                <button
                  onClick={handleLogout}
                  className="minecraft-btn px-3 py-2 font-pixel text-[9px] md:text-xs text-foreground"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                {isArchive ? (
                  <Link
                    to="/"
                    className="minecraft-btn px-4 py-2 font-pixel text-[10px] md:text-xs text-foreground"
                  >
                    World View
                  </Link>
                ) : (
                  <Link
                    to="/archive"
                    className="minecraft-btn px-4 py-2 font-pixel text-[10px] md:text-xs text-foreground"
                  >
                    Language Archive
                  </Link>
                )}
                <Link
                  to="/login"
                  className="minecraft-btn px-4 py-2 font-pixel text-[10px] md:text-xs text-foreground"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
