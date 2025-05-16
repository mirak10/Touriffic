import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    Email: "",
    Password: ""
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string().required("Password is required")
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", values);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ Password: "Invalid email or password" });
    }
    setSubmitting(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center" style={{ background: "#fff" }}>
      <div className="row w-100 justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="col-md-5 d-flex justify-content-center">
          <img
            src="\images\zanz.jpg" // Replace with your image path
            alt="Login visual"
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <div className="w-100">
            <h2 className="mb-4 text-center" style={{ fontWeight: "bold" }}>Sign in</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <Field
                      name="Email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage name="Email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-2">
                    <Field
                      name="Password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage name="Password" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <a href="#" style={{ fontSize: "0.9rem" }}>Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                  <div className="text-center" style={{ fontSize: "0.95rem" }}>
                    Don't have an account? <Link to="/register">Join Us</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;