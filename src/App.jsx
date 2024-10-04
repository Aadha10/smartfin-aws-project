// App.jsx
import React from "react";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import BudgetPage, { budgetLoader, budgetAction } from "./pages/BudgetPage"; // Import BudgetPage
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage"; // Import ExpensesPage without expensesAction
import Error from "./pages/Error"; // Import Error component
import LandingPageApp from "./components/Intro";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// // Action function for dashboard
// export async function dashboardAction({ request }) {
//   const data = await request.formData();
//   const { _action, ...values } = Object.fromEntries(data);

//   if (_action === "createBudget") {
//     try {
//       await createBudget({
//         name: values.newBudget,
//         amount: values.newBudgetAmount,
//       });
//       return null;
//       // Handle success, maybe redirect or show a success message
//     } catch (e) {
//       // Handle error
//       throw new Error("There was a problem creating your budget.");
//     }
//   }
// }

// // Action function for expenses
// export async function expensesAction({ request }) {
//   const data = await request.formData();
//   const { _action, ...values } = Object.fromEntries(data);

//   if (_action === "createExpense") {
//     try {
//       await createExpense({
//         name: values.newExpense,
//         amount: values.newExpenseAmount,
//         budgetId: values.newExpenseBudget,
//       });
//       return null;
//       // Handle success, maybe redirect or show a success message
//     } catch (e) {
//       // Handle error
//       throw new Error("There was a problem creating your expense.");
//     }
//   }

//   if (_action === "deleteExpense") {
//     try {
//       await deleteItem({
//         key: "expenses",
//         id: values.expenseId,
//       });
//       // Handle success, maybe redirect or show a success message
//       return null;
//     } catch (e) {
//       throw new Error("There was a problem deleting your expense.");
//     }
//   }
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageApp />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <Authenticator>
        {({ signOut, user }) => <Dashboard user={user} signOut={signOut} />}
      </Authenticator>
    ),
    loader: dashboardLoader,
    action: dashboardAction,
    errorElement: <Error />,
  },
  {
    path: "budget/:id",
    element: <BudgetPage />,
    loader: budgetLoader,
    action: budgetAction,
    errorElement: <Error />,
    children: [
      {
        path: "delete",
        action: deleteBudget,
      },
    ],
  },
  {
    path: "expenses",
    element: <ExpensesPage />,
    loader: expensesLoader,
    action: expensesAction,
    errorElement: <Error />,
  },
  {
    path: "logout",
    action: logoutAction,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
