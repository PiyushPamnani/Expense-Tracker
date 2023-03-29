import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";
import useTransactions from "../../useTransactions";
import useStyles from "./detailStyles";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);
const Details = ({ title }) => {
  const classes = useStyles();
  const { total, charData } = useTransactions(title);
  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="h5">₹{total}</Typography>
        <Doughnut data={charData} />
      </CardContent>
    </Card>
  );
};

export default Details;
