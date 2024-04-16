import {
  useReducer,
  createContext,
  PropsWithChildren,
  Dispatch,
  useMemo,
} from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  restante: number;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const restante = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        dispatch,
        state,
        totalExpenses,
        restante,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
