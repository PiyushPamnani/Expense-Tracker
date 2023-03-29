import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  const selectedCategoryTransaction = transactions.filter(
    (trans) => trans.type === title
  );
  const total = selectedCategoryTransaction.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  console.log({ selectedCategoryTransaction, total, categories });

  selectedCategoryTransaction.forEach((trans) => {
    const categoryType = categories.find((cat) => cat.type === trans.category);

    if (categoryType) categoryType.amount += trans.amount;
  });

  const filteredCategory = categories.filter((cat) => cat.amount > 0);

  const charData = {
    datasets: [
      {
        data: filteredCategory.map((cat) => cat.amount),
        backgroundColor: filteredCategory.map((cat) => cat.color),
      },
    ],
    labels: filteredCategory.map((cat) => cat.type),
  };

  return { total, charData };
};

export default useTransactions;
