import { Outlet, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import DashboardContextProvider from "../../context/DashboardContext";
import { Navbar, Footer } from "../../components";

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return { user: data.user };
  } catch {
    return redirect("/login");
  }
};

export default function DashboardLayout() {
  const { user } = useLoaderData();
  return (
    <DashboardContextProvider initialUser={user}>
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </DashboardContextProvider>
  );
}
