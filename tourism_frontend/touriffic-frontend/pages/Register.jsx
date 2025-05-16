import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    UserName: "",
    Email: "",
    Password: "",
    UserType: "Traveler"
  };

  const validationSchema = Yup.object({
    UserName: Yup.string().required("Required"),
    Email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string().min(6, "Min 6 characters").required("Required")
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", values);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({ Email: "Registration failed" });
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Username:</label>
            <Field name="UserName" />
            <ErrorMessage name="UserName" component="div" />
          </div>

          <div>
            <label>Email:</label>
            <Field name="Email" type="email" />
            <ErrorMessage name="Email" component="div" />
          </div>

          <div>
            <label>Password:</label>
            <Field name="Password" type="password" />
            <ErrorMessage name="Password" component="div" />
          </div>

          <div>
            <label>User Type:</label>
            <Field as="select" name="UserType">
              <option value="Traveler">Traveler</option>
              <option value="Agency">Agency</option>
              <option value="Admin">Admin</option>
            </Field>
          </div>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
