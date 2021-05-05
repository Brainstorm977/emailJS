import React from "react";
import emailjs from "emailjs-com";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import "./App.css";

const validationSchema = yup.object().shape({
  name: yup.string().typeError("Must be a string").required("Enter your name"),
  password: yup.string().min(3, "Too Short!").required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords are different")
    .required("Confirm your password"),
  email: yup.string().email("Enter a valid e-mail").required("Enter an e-mail"),
  message: yup.string().min(20, "Too Short!").required("Enter your message!"),
});

function App() {
  const handleSubmit = async (values, formTools) => {
    try {
      const res = await emailjs.send(
        "service_m4bp5pc",
        "template_bgfuq2l",
        {
          from_name: values.name,
          message: values.message,
          reply_to: values.email,
        },
        "user_7FnNuhJMxDUlf7lEWjcgI"
      );

      if (res) {
        formTools.resetForm();
      }
    } catch (e) {
      console.log("an error happened during sending your message", e);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          password: "",
          confirmPassword: "",
          email: "",
          message: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form className="form">
            <div>
              <label htmlFor="name">Name:</label>
              {/* refactor the form to use the Field component from Formik */}
              <Field
                className="input"
                type="text"
                placeholder="Your name"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                className="input"
                type="email"
                placeholder="example@example.com"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input
                className="input"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                className="message"
                name="message"
                id="message"
                cols="30"
                rows="10"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              ></textarea>
              {touched.message && errors.message && (
                <p className="error">{errors.message}</p>
              )}
            </div>
            <button className="send-btn" onClick={handleSubmit} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
