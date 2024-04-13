import { useReducer } from "react";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" };

export type BudgetState = {
  budget: number;
  isModalVisible: boolean;
};

export const initialState: BudgetState = {
  budget: 0,
  isModalVisible: false,
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
      };

    default:
      return state;
  }
};
