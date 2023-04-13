import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  desktop: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  main: {
    [theme.breakpoints.up("md")]: {
      paddingBottom: "5%",
    },
  },
  [theme.breakpoints.only("sm")]: {
    tablet: {
      display: "flex",
    },
    tablets: {
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
  last: {
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
      paddingBottom: "200px",
    },
  },
  grid: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));
