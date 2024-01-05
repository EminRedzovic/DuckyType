import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { auth } from "../firebase";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),

  password: yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
});

const Login = () => {
  const [user, setUser] = useState({});
  console.log(user);
  const [isLoading, SetisLoading] = useState(false);

  const navigate = useNavigate("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (isLoading) {
        SetisLoading(false);
      }
    });
    return () => unsubscribe();
  }, [isLoading]);

  const signIn = async (values) => {
    console.log("alo1");
    try {
      console.log("alo21");

      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  if (!user) {
    return (
      <Layout>
        <div className="container">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              console.log("MRNJAU");

              signIn(values);
            }}
            validationSchema={loginSchema}
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
                    Sign in
                  </Typography>
                </center>
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
                      label="password..."
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
                        navigate("/register");
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Register
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

export default Login;
