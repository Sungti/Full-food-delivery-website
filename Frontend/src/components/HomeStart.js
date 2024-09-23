import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import scooty from "../images/scooty.png";

const useStyles = makeStyles((theme) => ({
  presentation: {
    display: "flex",
    width: "90%",
    margin: "auto",
    minHeight: "80vh",
    alignItems: "center",
    position: "relative", 
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingTop: 20, 
    paddingBottom: 20, 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  
  delivery: {
    color: "#242424",
    fontSize: 70, 
    fontWeight: "bold",
    marginTop: -20, 
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
      marginTop: -10,
      marginBottom: 5,
    },
  },
  paragraph: {
    width: "70%", 
    fontSize: 20, 
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      fontSize: 16,
    },
  },
  coverContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    margin: "auto",
    paddingTop: 20, 
    [theme.breakpoints.down("sm")]: {
      paddingTop: 10,
    },
  },
  coverImg: {
    maxWidth: "50%", 
    height: "auto",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "70%",
    },
  },
  scootyImg: {
    maxWidth: "80%", 
    height: "auto",
    marginTop: 20, 
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  deliciousFood: {
    color: "#f76f57", 
  },
  delivery1: {
    color: "#242424",
    fontSize: 70, 
    fontWeight: "bold",
    marginTop: -20, 
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
      marginTop: -10,
      marginBottom: 5,
    },
  },
  
}));

const HomeStart = () => {
  const classes = useStyles();

  return (
    <section className={classes.presentation}>
      
      <div className={classes.coverContainer}>
        <img src={scooty} alt="scooty" className={classes.scootyImg} />
      </div>
      <div className={classes.introduction}>
        
        
      <Typography className={classes.delivery} noWrap>
          We Bring <span className={classes.deliciousFood}>Delicious Food</span></Typography>
          <Typography className={classes.delivery1} noWrap>
          To your Doorstep
        </Typography>
        <Typography variant="body2" className={classes.paragraph}>
        Craving something delicious? Get your favorite meals delivered hot and fresh, right to your doorstep.</Typography>
        
      </div>
    </section>
  );
};

export default React.memo(HomeStart);
