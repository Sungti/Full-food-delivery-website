import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@font-face': {
      fontFamily: "'Roboto Slab'",
      fontStyle: 'normal',
      fontWeight: '100',
      src: "url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100&display=swap') format('woff2')",
    },
  },
  footer: {
    color: "#FFFFFF", 
    backgroundColor: "#d16a58", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: "20px 8vw",
    fontFamily: "'Roboto Slab', serif",
  },
  footerContent: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 80,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: 35,
    },
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 20,
  },
  footerLogo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF", 
    marginBottom: 20,
    fontFamily: "'Roboto Slab', serif",
    fontWeight: "bold", 
  },
  footerLinks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerLink: {
    cursor: "pointer",
    marginBottom: 10,
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "#ffd8d1",
    },
  },
  footerSocialIcons: {
    display: "flex",
    gap: 15,
    marginTop: 10,
  },
  footerCopyright: {
    width: "100%",
    borderTop: "1px solid #FFFFFF",
    paddingTop: 10,
    marginTop: 20,
    textAlign: "center",
  },
  
  footerContainer: {
    paddingTop: 70, 
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footer} id="footer">
        <div className={classes.footerContent}>
          <div className={classes.footerSection}>
            <Typography variant="h2" className={classes.footerLogo}>
              GrubExpressDelivery
            </Typography>
            <Typography variant="body1">
              We bring the finest culinary delights right to your doorstep.
              Whether you're craving a quick bite or a sumptuous feast, we've
              got you covered. Experience the joy of eating well, wherever you
              are. Bon appétit!
            </Typography>
          </div>
          <div className={classes.footerSection}>
            <Typography variant="h4">COMPANY</Typography>
            <ul className={classes.footerLinks}>
              <li>
                <a href="/about-us" className={classes.footerLink}>
                  About us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className={classes.footerLink}>
                  Privacy policy
                </a>
              </li>
              {!authenticated && ( 
                <li>
                  <a href="/partner" className={classes.footerLink}>
                    Partner with us
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className={classes.footerSection}>
            <Typography variant="h4">GET IN TOUCH</Typography>
            <ul className={classes.footerLinks}>
              <li>+123 456 789</li>
              <li>contact@GrubExpressDelivery@gmail.com</li>
            </ul>
          </div>
        </div>
        <Typography variant="body2" className={classes.footerCopyright}>
          © 2024 GrubExpressDelivery - All Rights Reserved.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
