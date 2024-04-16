import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "delete-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset-budget" }
  | { type: "add-filter-category"; payload: { id: Category["id"] } };

export type BudgetState = {
  budget: number;
  isModalVisible: boolean;
  expenses: Expense[];
  editingID: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorage ? Number(localStorageBudget) : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  isModalVisible: false,
  expenses: localStorageExpenses(),
  editingID: "",
  currentCategory: "",
};

const createExpense = (expense: DraftExpense): Expense => {
  return {
    ...expense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "add-budget":
      return {
        ...state,
        budget: action.payload.budget,
      };

    case "show-modal":
      return {
        ...state,
        isModalVisible: true,
      };

    case "close-modal":
      return {
        ...state,
        isModalVisible: false,
        editingID: "",
      };
    case "add-expense": {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        isModalVisible: false,
      };
    }

    case "delete-expense": {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    }

    case "get-expense-by-id": {
      return {
        ...state,
        editingID: action.payload.id,
        isModalVisible: true,
      };
    }

    case "update-expense": {
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        isModalVisible: false,
        editingID: "",
      };
    }

    case "reset-budget":
      return {
        ...state,
        budget: 0,
        expenses: [],
      };
      case "add-filter-category":{
        return {
          ...state,
          currentCategory: action.payload.id
        }
      }

    default:
      return state;
  }
};
