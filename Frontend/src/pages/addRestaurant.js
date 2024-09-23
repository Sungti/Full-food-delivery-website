import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Material-UI components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";

// Custom form handling hook
import useForm from "../hooks/forms";

// Redux action for signing up seller
import { signupSeller } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4), 
    padding: theme.spacing(2), 
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    margin: "auto", 
    maxWidth: 600, 
  },
  address: {
    "& > *": {
      marginBottom: theme.spacing(2), 
      width: "100%", 
    },
  },
  uploadButton: {
    margin: theme.spacing(2, 0), 
    color: "white",
    backgroundColor: "#f76f57",
    "&:hover": {
      backgroundColor: "#b55c4c",
    },
  },
  button: {
    backgroundColor: '#f76f57',
    color: 'white',
    "&:hover": {
      backgroundColor: '#b34e3d',
    },
  },
  imagePreview: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2), 
    marginTop: theme.spacing(2),
  },
  imageThumbnail: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
}));

export default function AddRestaurant() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [images, setImages] = useState([]);
  let imageError;

  const { loading, serverError, errorsSeller } = useSelector(
    (state) => state.UI
  );

  const { message, errors } = errorsSeller || {};

  if (message) {
    if (message.includes("Upload an image")) imageError = message;
  }

  const handleFileSelect = (event) => {
    setImages([...event.target.files]);
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  // Error variables
  let emailError = null;
  let passwordError = null;
  let confirmPasswordError = null;
  let streetError = null;
  let aptError = null;
  let localityError = null;
  let zipError = null;
  let phoneNoError = null;
  let nameError = null;
  let tagsError = null;
  let costForOneError = null;
  let minOrderError = null;
  let paymentError = null;

  if (errors) {
    for (let error of errors) {
      if (error.msg.includes("valid email")) emailError = error.msg;
      if (error.msg.includes("Email address already")) emailError = error.msg;
      if (error.msg.includes("least 6 characters long"))
        passwordError = error.msg;
      if (error.msg.includes("Passwords have to"))
        confirmPasswordError = error.msg;
      if (error.msg.includes("10 digit phone")) phoneNoError = error.msg;
      if (error.msg.includes("Minimum Order")) minOrderError = error.msg;
      if (error.msg.includes("Cost for one cannot"))
        costForOneError = error.msg;
      if (error.msg.includes("Zipcode cannot")) zipError = error.msg;
      if (error.msg.includes("Locality cannot")) localityError = error.msg;
      if (error.msg.includes("Apartment name cannot")) aptError = error.msg;
      if (error.msg.includes("Street cannot")) streetError = error.msg;
      if (error.msg.includes("Tags cannot")) tagsError = error.msg;
      if (error.msg.includes("Payment cannot be")) paymentError = error.msg;
      if (error.msg.includes("Restaurant Name")) nameError = error.msg;
    }
  }

  // Form submission handler
  const signupSellerHandle = () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("tags", inputs.tags);
    formData.append("costForOne", inputs.costForOne);
    formData.append("minOrderAmount", inputs.minOrderAmount);
    formData.append("street", inputs.street);
    formData.append("aptName", inputs.aptName);
    formData.append("locality", inputs.locality);
    formData.append("zip", inputs.zip);
    formData.append("phoneNo", inputs.phoneNo);
    formData.append("password", inputs.password);
    formData.append("confirmPassword", inputs.confirmPassword);
    formData.append("payment", inputs.payment);
    formData.append("role", "ROLE_SELLER");
    dispatch(signupSeller(formData, history));
  };

  // Form handling using useForm hook
  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      tags: "",
      costForOne: "",
      minOrderAmount: "",
      street: "",
      aptName: "",
      locality: "",
      zip: "",
      phoneNo: "",
      payment: "",
      password: "",
      confirmPassword: "",
    },
    signupSellerHandle
  );

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} elevation={2}>
            <Typography variant="h4" align="center">
              Add a Restaurant
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              Basic Info - Get Started
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                id="restName"
                name="name"
                label="Restaurant Name"
                className={classes.textField}
                placeholder="Your restaurant name"
                onChange={handleInputChange}
                value={inputs.name}
                helperText={nameError}
                error={nameError ? true : false}
                fullWidth
                required
              />
              <TextField
                id="email"
                name="email"
                label="Business Email"
                placeholder="Your business Email"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.email}
                helperText={emailError}
                error={emailError ? true : false}
                fullWidth
                required
              />
              <TextField
                id="tags"
                name="tags"
                label="Tags"
                placeholder="Vegetarian, Desserts, Soup"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.tags}
                helperText={tagsError}
                error={tagsError ? true : false}
                fullWidth
                required
              />
              <TextField
                id="costForOne"
                name="costForOne"
                label="Max Order"
                placeholder="Max order"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.costForOne}
                helperText={costForOneError}
                error={costForOneError ? true : false}
                type="number"
                fullWidth
                required
              />
              <TextField
                id="minOrderAmount"
                name="minOrderAmount"
                label="Min Order Amount"
                placeholder="Minimum amount to place order"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.minOrderAmount}
                helperText={minOrderError}
                error={minOrderError ? true : false}
                type="number"
                fullWidth
                required
              />
              <Typography variant="body2" style={{ margin: "16px 0" }}>
                Address:
              </Typography>
              <div className={classes.address}>
                <TextField
                  id="aptName"
                  name="aptName"
                  label="Floor/Apartment Name"
                  className={classes.textField}
                  onChange={handleInputChange}
                  value={inputs.aptName}
                  helperText={aptError}
                  error={aptError ? true : false}
                  fullWidth
                  required
                />
                <TextField
                  id="locality"
                  name="locality"
                  label="Locality"
                  className={classes.textField}
                  onChange={handleInputChange}
                  value={inputs.locality}
                  helperText={localityError}
                  error={localityError ? true : false}
                  fullWidth
                  required
                />
                <TextField
                  id="street"
                  name="street"
                  label="Street"
                  className={classes.textField}
                  onChange={handleInputChange}
                  value={inputs.street}
                  helperText={streetError}
                  error={streetError ? true : false}
                  fullWidth
                  required
                />
                <TextField
                  id="zipCode"
                  name="zip"
                  label="Zip Code"
                  className={classes.textField}
                  onChange={handleInputChange}
                  value={inputs.zip}
                  helperText={zipError}
                  error={zipError ? true : false}
                  fullWidth
                  required
                />
              </div>
              <TextField
                id="phoneNo"
                name="phoneNo"
                label="Phone Number"
                placeholder="Your business phone number"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.phoneNo}
                helperText={phoneNoError}
                error={phoneNoError ? true : false}
                fullWidth
                required
              />
              <TextField
  id="payment"
  name="payment"
  select
  label="Payment Method"
  className={classes.textField}
  onChange={handleInputChange}
  value={inputs.payment}
  helperText={paymentError}
  error={paymentError ? true : false}
  fullWidth
  required
>
  <MenuItem value="Cash">Cash</MenuItem>
  <MenuItem value="Online">Online</MenuItem>
</TextField>

              <TextField
                id="password"
                name="password"
                label="Password"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.password}
                helperText={passwordError}
                error={passwordError ? true : false}
                type="password"
                fullWidth
                required
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                className={classes.textField}
                onChange={handleInputChange}
                value={inputs.confirmPassword}
                helperText={confirmPasswordError}
                error={confirmPasswordError ? true : false}
                type="password"
                fullWidth
                required
              />
              {serverError && (
                <Typography variant="body2" className={classes.customError}>
                  {serverError}
                </Typography>
              )}
              {imageError && (
                <Typography variant="body2" className={classes.customError}>
                  {imageError}
                </Typography>
              )}
              <input
                type="file"
                id="imageInput"
                onChange={handleFileSelect}
                hidden
                multiple
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.uploadButton}
                onClick={triggerFileInput}
                fullWidth
              >
                Upload Images
              </Button>
              <div className={classes.imagePreview}>
                {images.length > 0 &&
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`preview ${index}`}
                      className={classes.imageThumbnail}
                    />
                  ))}
              </div>
              <Button
  type="submit"
  variant="contained"
  className={classes.button} 
  
  disabled={loading}
  fullWidth
>
  {loading && (
    <CircularProgress size={30} className={classes.progress} />
  )}
  Add Restaurant
</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
