import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");
    dispatch({ type: "add-budget", payload: { budget } });
  };

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
      </div>

      <input
        id="budget"
        type="number"
        className="w-full bg-white border border-gray-200 p-2 rounded-md outline-none focus:border-blue-600 transition-colors"
        placeholder="Define tu presupuesto"
        name="budget"
        value={budget}
        onChange={handleChange}
      />

      <input
        type="submit"
        value="definir presupuesto"
        className=" disabled:opacity-40 transition-colors duration-300 rounded-md bg-blue-600
         hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
        disabled={isValid}
      />
    </form>
  );
};
