import { useReducer, createContext, PropsWithChildren, Dispatch } from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        dispatch,
        state,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
