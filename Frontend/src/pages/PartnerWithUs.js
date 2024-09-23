import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import deliveryImage from '../images/delivery.png'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    flexGrow: 1, 
    padding: theme.spacing(4),
    textAlign: "center",
  },
  button: {
    color: "#fff",
    backgroundColor: "#d16a58",
    "&:hover": {
      backgroundColor: "#b74f47",
    },
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto", 
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  },
  para1: {
    fontSize: "30px",
  },
  para2: {
    fontSize: "20px",
  },
  image: {
    width: '90%', // Adjust this value to reduce the image size
    maxWidth: '300px', // Set a maximum width if needed
    margin: '0 auto', 
    display: 'block',
    paddingBottom: '30px',
  }
}));

const PartnerWithUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img src={deliveryImage} alt="Delivery" className={classes.image} />
        <Typography variant="h2" style={{ fontWeight: 'bold', color: '#f76f57' }}>
          Join us today!
        </Typography>
        <Typography variant="body1" paragraph className={classes.para1}>
          Partner with GrubExpressDelivery and become part of a growing community of restaurants that are committed to delivering exceptional food experiences.
        </Typography>
        <Typography variant="body1" align="left" paragraph className={classes.para2}>
          <strong style={{ color: "#e85c43" }}>Why Choose GrubExpressDelivery?</strong>
          <p>1. <strong style={{ color: "#e85c43" }}>Broaden Your Reach:</strong> Tap into a vast network of hungry customers eager to discover new dining experiences. Our platform connects you with a diverse audience, increasing your restaurant's visibility and orders.</p>
          <p>2. <strong style={{ color: "#e85c43" }}>Seamless Order Management:</strong> Manage all your orders effortlessly with our user-friendly dashboard. Track deliveries, update menus, and communicate with customers—all from one place.</p>
          <p>3. <strong style={{ color: "#e85c43" }}>Fast & Reliable Deliveries:</strong> Our dedicated team of delivery partners ensures that your food reaches customers hot and fresh, maintaining the quality your restaurant is known for.</p>
          <p>4. <strong style={{ color: "#e85c43" }}>Marketing Support:</strong> Benefit from our marketing campaigns designed to promote your restaurant. From featured listings to special promotions, we help you stand out in a crowded marketplace.</p>
          <p>5. <strong style={{ color: "#e85c43" }}>24/7 Support:</strong> Our support team is available around the clock to assist with any issues or questions, ensuring your operations run smoothly without interruptions.</p>
        </Typography>
        <Link to="/addrestaurant">
          <Button className={classes.button}>Add Restaurant</Button>
        </Link>
      </div>
    </div>
  );
};

export default PartnerWithUs;
