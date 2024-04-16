import {buildStyles,CircularProgressbar} from 'react-circular-progressbar';
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {

  const {dispatch, state,restante,totalExpenses}= useBudget();

  const percentage = (totalExpenses/state.budget)*100

  console.log(percentage)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
   <CircularProgressbar
   value={percentage}
   styles={buildStyles({
    pathColor:percentage=== 100 ? '#DC2626' : '#3B82F6',
    trailColor:'#F5F5F5',
    textSize:10,
    textColor:'#3B82F6',
   })}
   text={`${percentage}% Gastado`}
   />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-pink-700 transition-colors"
          type="button"
          onClick={()=> dispatch({type:'reset-budget'})}
        >
          Restear App
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />

        <AmountDisplay label="Disponible" amount={restante} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
};
