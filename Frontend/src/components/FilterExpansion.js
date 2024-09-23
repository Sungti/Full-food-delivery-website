import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backgroundColorChange: {
    backgroundColor: theme.palette.background.paper,
  },
  spaceTypo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

// Main functional component
export default function SimpleExpansionPanel(props) {
  const classes = useStyles();
  const { items, deliveryCharge, condition } = props;
  let totalPrice = 0;

  if (condition === "Orders") {
    // Calculate total price
    items.forEach((item) => {
      if (item.item && item.item.price) {
        totalPrice += item.quantity * item.item.price;
      } else {
        console.error('Item or item.price is undefined:', item);
      }
    });
  }

  // Ensure deliveryCharge is a number
  const validDeliveryCharge = typeof deliveryCharge === 'number' ? deliveryCharge : 30;

  // Calculate grand total
  const grandTotal = totalPrice + validDeliveryCharge;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.backgroundColorChange}
        >
          <Typography className={classes.heading}>
            {condition === "Orders" && "Order Summary"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          {condition === "Orders" && (
            <>
              {items.map((item) => {
                if (item.item && item.item.price) {
                  return (
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      key={item.item._id}
                    >
                      <div className={classes.spaceTypo}>
                        <span>{item.item.title}</span>
                        <span>
                          Rs. {item.item.price} x {item.quantity}
                        </span>
                      </div>
                      <br />
                    </Typography>
                  );
                } else {
                  console.error('Item or item.price is undefined:', item);
                  return null;
                }
              })}
              <Typography variant="body2" style={{ marginTop: 10 }}>
                Item Total: Rs. {totalPrice}
              </Typography>
              <Typography variant="body2" style={{ marginTop: 10 }}>
                Delivery Charge: Rs. {validDeliveryCharge}
              </Typography>
              <Typography variant="h5" className={classes.heading} style={{ marginTop: 10 }}>
                Grand Total: Rs. {grandTotal}
              </Typography>
            </>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
