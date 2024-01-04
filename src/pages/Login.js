import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { auth } from "../firebase";

const Login = () => {
  const [user, setUser] = useState({});
  console.log(user);
  const [isLoading, SetisLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (isLoading) {
        SetisLoading(false);
      }
    });
    return () => unsubscribe();
  }, [isLoading]);
  return (
    <Layout>
      <div>Login</div>
    </Layout>
  );
};

export default Login;
