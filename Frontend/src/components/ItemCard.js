import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

//custom-hook
import useForm from "../hooks/forms";

import MyButton from "../util/MyButton";
import { deleteItem, editItem } from "../redux/actions/dataActions";
import ItemDialog from "../components/ItemDialog";
import { addToCart } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    margin: "auto",
    marginTop: "50px",
    borderRadius: "15px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",  
  },
  media: {
    height: 180,
    margin: theme.spacing(2), 
    borderRadius: "10px", 
    objectFit: "cover", 
  },
  content: {
    flex: "1 0 auto",
    textAlign: "center",
  },
  price: {
    backgroundColor: "#f5724e", 
    padding: "3px 20px",
    borderRadius: "5px",
    display: "inline-block",
    color: "#ffffff", 
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  addToCartButton: {
    backgroundColor: "#d96a57",
    color: "#fff",
    '&:hover': {
      backgroundColor: "#c45d4b",
    },
  },
}));



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ItemCard(props) {
  const classes = useStyles();
  const { title, imageUrl, description, price, _id } = props;
  const imageUrlSplit = imageUrl.split("\\");
  const finalImageUrl = `${process.env.REACT_APP_SERVER_URL}/${imageUrlSplit[0]}/${imageUrlSplit[1]}`; //3002 - server port

  const dispatch = useDispatch();

  const {
    authenticated,
    account: { role },
  } = useSelector((state) => state.auth);
  const { addCartSuccess } = useSelector((state) => state.data);

  const [open, setOpen] = useState(false);
  const [openSnackBar, setSnackBar] = useState(false);
  const [image, setImage] = useState(null);
  const { inputs, handleInputChange } = useForm({
    title: "",
    description: "",
    price: "",
  });

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleClose = () => {
    inputs.title = "";
    inputs.description = "";
    inputs.price = "";
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    const itemData = new FormData();
    if (image !== null) itemData.append("image", image);
    else itemData.append("image", imageUrl);
    itemData.append("title", inputs.title);
    itemData.append("description", inputs.description);
    itemData.append("price", inputs.price);
    dispatch(editItem(itemData, _id)); 
    handleClose();
  };

  const openEdit = () => {
    inputs.title = title;
    inputs.price = price;
    inputs.description = description;
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteItem(_id));
  };

  const handleCart = () => {
    const itemData = {
      itemId: _id,
    };
    dispatch(addToCart(itemData));
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      setSnackBar(false);
      return;
    }

    setSnackBar(false);
  };

  const handleSnackBar = (event, reason) => {
    if (addCartSuccess || addCartSuccess == null) setSnackBar(true);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardMedia
          className={classes.media}
          image={finalImageUrl}
          title="Item order"
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" noWrap>
            {description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary"className={classes.price}>
            Rs.{price}
          </Typography>
          <div className={classes.buttonContainer}>
            {role === "ROLE_SELLER" ? (
              <>
                <MyButton tip="Edit" onClick={openEdit}>
                  <EditIcon style={{ color: "green" }} />
                </MyButton>
                <MyButton tip="Delete" onClick={handleDelete}>
                  <DeleteIcon style={{ color: "#f44336" }} />
                </MyButton>
              </>
            ) : authenticated ? (
              <Button
                className={classes.addToCartButton}
                onClick={() => {
                  handleCart();
                  handleSnackBar();
                }}
                variant="contained"
              >
                Add to Cart
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  className={classes.addToCartButton}
                  variant="contained"
                >
                  Add to Cart
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleFileSelect={handleFileSelect}
        inputs={inputs}
        handleInputChange={handleInputChange}
      />
      <div className={classes.snackbar}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3600}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            style={{ backgroundColor: "#f76f57" }}
          >
            Item added to cart!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
