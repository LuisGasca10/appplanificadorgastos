import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

interface Props {
  expense: Expense;
}

export const ExpenseDetails = ({ expense }: Props) => {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const { dispatch } = useBudget();

  const leadingAction = () => {
    return (
      <LeadingActions>
        <SwipeAction onClick={() => dispatch({type:'get-expense-by-id', payload:{id:expense.id}})}>Actualizar</SwipeAction>
      </LeadingActions>
    );
  };

  const trailingAction = () => {
    return (
      <TrailingActions>
        <SwipeAction
          onClick={() =>
            dispatch({ type: "delete-expense", payload: { id: expense.id } })
          }
          destructive
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingAction()}
        trailingActions={trailingAction()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 rounded-md flex gap-5 items-center ">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt={`icono ${categoryInfo.icon}`}
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-500 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
