import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useState } from "react";
import { DraftExpense } from "../types/index";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    category: "",
    expenseName: "",
    date: new Date(),
  });

  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
        Nuevo gasto
      </legend>
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
          />
        </div>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-md"
        value="Registrar Gasto"
      />
    </form>
  );
};
