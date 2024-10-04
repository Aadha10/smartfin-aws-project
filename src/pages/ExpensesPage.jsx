import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";

export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      await deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1 className="h2">Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <Table expenses={expenses} showBudget={true} />
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default ExpensesPage;
