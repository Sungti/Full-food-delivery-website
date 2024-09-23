import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeStart from "../components/HomeStart";
import SearchBar from "../components/SearchBar";
import Spinner from "../util/spinner/spinner";
import RestaurantContent from "../components/RestaurantContent";

const useStyles = makeStyles(() => ({
  center: {
    textAlign: "center",
  },
  searchBarContainer: {
    margin: "24px 0 28px",
  },
  restaurantSection: {
    marginTop: "24px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    account: { role },
    authenticated,
  } = useSelector((state) => state.auth);
  const [locationStatus, setLocationStatus] = useState(
    localStorage.getItem("location") ? true : false
  );

  let restaurantMarkup = loading ? <Spinner /> : <RestaurantContent />;

  return (
    <>
      {authenticated && role === "ROLE_SELLER" ? (
        <Redirect to="/seller/dashboard" />
      ) : (
        <>
          <HomeStart />
          <Container fluid>
            <Row className="justify-content-center mt-3">
              <Col xs={12} className={classes.center}>
                <Typography variant="h5" noWrap>
                  Discover restaurants near you&nbsp;&nbsp;
                  <span style={{ fontSize: 40 }}>🍽</span>
                </Typography>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs={10} sm={8} md={6} className={classes.searchBarContainer}>
                <SearchBar page="home" action={setLocationStatus} />
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs={10} sm={9} md={11} className={classes.restaurantSection}>
                {locationStatus ? (
                  restaurantMarkup
                ) : (
                  <Typography variant="body1" className={classes.center} noWrap>
                    Enter your location to view nearby restaurants
                  </Typography>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
