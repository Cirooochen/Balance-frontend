import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const DashboardContext = createContext(null);

export default function DashboardContextProvider({ children, initialUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser || null);

  useEffect(() => {
    setUser(initialUser || null);
  }, [initialUser]);

  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout");
    } catch {}
    setUser(null);
    toast.success("Logged Out Successfully");
    navigate("/");
  };

  return (
    <DashboardContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </DashboardContext.Provider>
  );
}

// ✅ simple hook so imports like `useDashboardContext` work
export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboardContext must be used inside provider");
  return ctx;
}
