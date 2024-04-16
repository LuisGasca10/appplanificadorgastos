import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types/index";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const formInitState: DraftExpense = {
  amount: 0,
  category: "",
  expenseName: "",
  date: new Date(),
};
export const ExpenseForm = () => {
  const [error, setError] = useState("");
  const [expense, setExpense] = useState<DraftExpense>(formInitState);
const [prevuisAmount, setPrevuisAmount] = useState(0)
  const { dispatch, state,restante,totalExpenses } = useBudget();

  useEffect(() => {
    if (state.editingID) {
      const editExpense = state.expenses.filter(
        (expense) => expense.id === state.editingID
      );
      setExpense(editExpense[0]);
      setPrevuisAmount(editExpense[0].amount)
    }
  }, [state.editingID]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("") || expense.amount === 0 ) {
     return setError("Todos los cambios son Obligatorios");
    }
    // Validar que no sobre pase el presupuesto
    if ((expense.amount- prevuisAmount) > restante) {
      setError('Ese Gasto se sale del presupuesto');
      return
    }

    if (state.editingID) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingID, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }
    setExpense(formInitState);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
       {state.editingID ? "Editar Gasto" : "Agregar Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2 rounded-md outline-none border-2 border-transparent transition-all focus:border-blue-700"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2 rounded-md outline-none border-2 border-transparent transition-all focus:border-blue-700"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          value={expense.category}
          className="bg-slate-100 p-2 rounded-md"
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Fecha Gasto:
          </label>
          <DatePicker
            value={expense.date}
            className="bg-slate-100 p-2 border-0"
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-md"
        value={state.editingID ? "Actualizar Gasto" : "Agregar Gasto"}
      />
    </form>
  );
};
