import { Link, useRouteLoaderData } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { useContext } from "react";

export function Navbar() {
  // Will be undefined on public pages, defined on /dashboard*
  const dashData = useRouteLoaderData("dashboard");
  const user = dashData?.user ?? null;
  const { logoutUser } = useContext(DashboardContext);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link className="btn btn-ghost" to="/">
            <img src="/BalanceLogo.svg" className="w-full" alt="Balance" />
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/about" className="btn btn-ghost">
                About Us
              </Link>
              {/* optional link into protected area */}
              <Link to="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <button
                type="submit"
                onClick={logoutUser}
                className="btn btn-ghost"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
