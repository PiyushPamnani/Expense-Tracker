import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import useStyles from "./formStyles";
import { ExpenseTrackerContext } from "../../../context/context.js";
import { useSpeechContext } from "@speechly/react-client";
import formateDate from "../../../utils/formatDate";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import { v4 as uuidv4 } from "uuid";
import Alertbar from "../../Alertbar/Alertbar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formateDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const selectedCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    setOpen(true);
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense")
        setFormData({ ...formData, type: "Expense" });
      else if (segment.intent.intent === "add_income")
        setFormData({ ...formData, type: "Income" });
      else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      )
        return createTransaction();
      else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      )
        setFormData(initialState);

      segment.entities.forEach((entity) => {
        const correctCategory = `${entity.value.charAt(0)}${entity.value
          .slice(1)
          .toLowerCase()}`;

        switch (entity.type) {
          case "amount":
            setFormData({ ...formData, amount: entity.value });
            break;
          case "category":
            if (
              incomeCategories.map((iC) => iC.type).includes(correctCategory)
            ) {
              setFormData({
                ...formData,
                type: "Income",
                category: correctCategory,
              });
            } else if (
              expenseCategories.map((eC) => eC.type).includes(correctCategory)
            ) {
              setFormData({
                ...formData,
                type: "Expense",
                category: correctCategory,
              });
            }
            break;
          case "date":
            setFormData({ ...formData, date: entity.value });
            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  return (
    <Grid container spacing={2}>
      <Alertbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map((word) => word.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategory.map((cat) => (
              <MenuItem key={cat.type} value={cat.type}>
                {cat.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formateDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
