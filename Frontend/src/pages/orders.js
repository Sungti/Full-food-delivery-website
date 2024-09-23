import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openSocket from "socket.io-client";

import { getOrders, socketStatusUpdate } from "../redux/actions/dataActions";
import OrderCard from "../components/OrderCard";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", 
  },
  content: {
    flex: 1, 
    paddingBottom: theme.spacing(2),
    paddingTop:'30px', 
    paddingLeft: '30px',
  },
  para: {
    fontSize: "x-large",
    textAlign: "center",
  },
  title: {
    marginBottom: theme.spacing(3), 
  },
}));

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.data);
  const {
    account: { role },
    _id,
  } = useSelector((state) => state.auth);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrders());
    const socket = openSocket(process.env.REACT_APP_SERVER_URL);
    socket.emit("add-user", { userId: _id });
    socket.on("orders", (data) => {
      if (data.action === "update") {
        dispatch(socketStatusUpdate(data.order));
      }
      if (data.action === "create") {
        dispatch(getOrders());
        dispatch(getOrders());
      }
    });
  }, []); 

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Order History
        </Typography>
        <Grid container spacing={2}>
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <Grid item xs={12} sm={4} key={order._id}>
                  <OrderCard order={order} role={role} />
                </Grid>
              ))
            ) : (
              <p className={classes.para}>No Orders present.</p>
            )
          ) : null}
        </Grid>
      </div>
    </div>
  );
};

export default Orders;
