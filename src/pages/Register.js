import "../style/style.css";

import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { isUsernameAvailable, submitLoginData } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { getAuth } from "firebase/auth";
import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const registerSchema = yup.object({
  email: yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),
  displayName: yup
    .string()
    .required("Username je obavezno polje, unesite svoje ime"),
  password: yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
});

const Register = () => {
  const [user, setUser] = useState({});
  const [isAvilable, setIsAvilable] = useState();
  const [isLoading, SetisLoading] = useState(false);
  const navigate = useNavigate("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (isLoading) {
        SetisLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, isLoading]);

  const signIn = async (values) => {
    try {
      const avilable = await isUsernameAvailable(values.displayName);
      setIsAvilable(avilable);
    } catch (error) {
      console.log(error);
    }
    if (isAvilable) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const data = {
          displayName: values.displayName,
          email: values.email,
          isAdmin: values.isAdmin,
        };
        await submitLoginData(data);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Username is already taken!");
    }
  };
  if (!user) {
    return (
      <Layout>
        <div className="container">
          <Formik
            initialValues={{
              displayName: "",
              email: "",
              password: "",
              isAdmin: false,
            }}
            onSubmit={(values, actions) => {
              signIn(values);
            }}
            validationSchema={registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Box>
                <center>
                  <Typography
                    variant="h4"
                    color={"rgba(16,24,32,1)"}
                    gutterBottom
                  >
                    Sign up
                  </Typography>
                </center>
                <Box my={2} center>
                  <center>
                    <TextField
                      type="text"
                      name="displayName"
                      label="Username"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.displayName || ""}
                    />
                    <Typography variant="body1" color={"error"}>
                      {errors.displayName &&
                        touched.displayName &&
                        errors.displayName}
                    </Typography>
                  </center>
                </Box>
                <Box my={2}>
                  <center>
                    <TextField
                      type="text"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email || ""}
                    />
                    <Typography variant="body1" color={"error"}>
                      {errors.email && touched.email && errors.email}
                    </Typography>
                  </center>
                </Box>
                <Box my={2}>
                  <center>
                    <TextField
                      type="password"
                      name="password"
                      label="password"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password || ""}
                    />

                    <Typography variant="body1" color={"error"}>
                      {errors.password && touched.password && errors.password}
                    </Typography>
                  </center>
                </Box>
                <center>
                  <Typography variant="body1">
                    Or{" "}
                    <span
                      onClick={() => {
                        navigate("/login");
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Login
                    </span>
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "rgba(16,24,32,1)",
                    }}
                  >
                    Submit
                  </Button>
                </center>
              </Box>
            )}
          </Formik>
        </div>
      </Layout>
    );
  }
  navigate("/");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Register;
