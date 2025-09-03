import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Home,
  Login,
  loginAction,
  SignUp,
  signupAction,
} from "./pages/website";

import Dashboard from "./pages/application/Dashboard"; // overview
import DashboardLayout, {
  dashboardLoader,
} from "./pages/application/DashboardLayout";

import AllowanceForm, {
  allowanceLoader,
  allowanceAction,
} from "./pages/application/AllowanceForm";

import AIPlan, { aiPlanloader } from "./pages/application/AIPlan";
import TaskDetail, { detailLoader } from "./pages/application/TaskDetail";
import Report from "./pages/application/Report";

import Error404 from "./pages/Error404";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "signup", element: <SignUp />, action: signupAction },
      { path: "login", element: <Login />, action: loginAction },

      // Protected: /dashboard
      {
        id: "dashboard",
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader, // auth check
        children: [
          { index: true, element: <Dashboard /> }, // overview

          {
            path: "allowance",
            element: <AllowanceForm />,
            loader: allowanceLoader,
            action: allowanceAction,
          },

          { path: "aiplan", element: <AIPlan />, loader: aiPlanloader },
          { path: "act/:actId", element: <TaskDetail />, loader: detailLoader },
          { path: "report", element: <Report /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
