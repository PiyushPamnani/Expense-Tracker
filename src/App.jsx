import React from "react";
import Details from "./Components/Details/Details";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import Main from "./Components/Main/Main";
import { Grid } from "@material-ui/core";
import useStyles from "./appStyles";

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        className={`${classes.grid} ${classes.tablet}`}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item lg={3} xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          className={`${classes.main} ${classes.tablets}`}
        >
          <Main />
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          sm={4}
          className={`${classes.desktop} ${classes.tablets}`}
        >
          <Details title="Income" />
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          sm={4}
          className={`${classes.last} ${classes.tablets}`}
        >
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
