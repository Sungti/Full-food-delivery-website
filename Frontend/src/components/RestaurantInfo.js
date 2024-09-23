import React from "react";
//redux
import { useSelector } from "react-redux";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Spinner from "../util/spinner/spinner";
import SwipeableImages from "./SwipeableImages";
import image from "../images/test3.png";

const useStyles = makeStyles({
  root: {
    padding: 20,
    marginBottom: 20,
    backgroundImage:`url(${image})`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  text: {
    color: "white",
  },
});

function Restaurant(props) {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    name,
    imageUrl,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    address,
  } = props;
  let paymentString;
  let phoneNo;
  let addressString;

  if (address) {
    phoneNo = address.phoneNo;
    addressString = `${address.aptName}, ${address.locality}, ${address.street}`;
  }

  if (payment && payment.length === 1)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment && payment.length === 2)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Paper elevation={3} className={classes.root}>
            <Grid container direction="row">
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={6} style={{ marginTop: 120 }}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  className={classes.text}

                  style={{ fontStyle: "bold" }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.text}

                >
                  {tags}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.text}

                >
                  Max Order {costForOne} 
                </Typography>
                <Typography variant="body2" color="textPrimary" className={classes.text}
                >
                  Minimum order {minOrderAmount}
                </Typography>
                <Typography variant="body2" color="textPrimary"className={classes.text}
                >
                  {paymentString}
                </Typography>
                <br />
                <Typography variant="body2" color="textPrimary" className={classes.text}
                >
                  Address: {addressString}
                </Typography>
                <Typography variant="body2" color="textPrimary"className={classes.text}
                >
                  Call: +91 {phoneNo}
                </Typography>
                <Typography variant="body2" color="textPrimary" className={classes.text}
                >
                Delivery Operational Hours: 9am to 9pm
              </Typography>
                <Typography variant="body2" color="textPrimary"                  className={classes.text}
                >
Orders will not be accepted after 9pm              </Typography>
                
              </Grid>
              <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
                {imageUrl ? (
                  <SwipeableImages images={imageUrl} type="restaurant" />
                ) : null}
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}

export default React.memo(Restaurant);
