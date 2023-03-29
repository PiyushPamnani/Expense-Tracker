import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import { ExpenseTrackerContext } from "../../context/context";
import useStyles from "./mainStyles";
import Form from "./Form/Form";
import Main_List from "./Main_List/Main_List";

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Expense Tracker"
        subheader="Created By Piyush Pamnani"
      />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ₹{balance}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ lineHeight: "1.5em", marginTop: "20px" }}
        >
          Try Saying: Add income for ₹100 in Category Salary for Tuesday
        </Typography>
        <Divider className={classes.divider} />
        <Form />
      </CardContent>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Main_List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
