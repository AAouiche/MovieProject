import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });
  
  export default function BasicForm() {
    return (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Form Values:', values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, handleSubmit }) => {
          // Debugging logs
          console.log('Errors:', errors);
          console.log('Touched:', touched);
  
          return (
            <form onSubmit={handleSubmit}>
              <Field type="email" name="email" placeholder="Enter your email" />
              
              {touched.email && errors.email ? <div style={{ color: 'red' }}>{errors.email}</div> : null}
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Formik>
    );
  }