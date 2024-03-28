import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { registerUser } from '../../redux/Slices/UserSlice';
import { AppDispatch } from '../../redux/Store';
import { RegisterForm } from '../../models/Register';
import {  Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';



const RegistrationSchema = Yup.object().shape({
    
    userName: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
function RegistrationForm(){
    const dispatch = useDispatch<AppDispatch>(); 
    const navigate = useNavigate();
    
    const initialValues: RegisterForm = {
        userName: '',
        passWord: '',
        firstName: '',
        email: '',
        lastName: ''
    };

    const handleSubmit = (values: RegisterForm) => {
        dispatch(registerUser(values)); 
        navigate('/'); 
    };

    return (
        <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={RegistrationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, handleChange, handleBlur }) => (
                        <Form >
                            <Field type="text" name="userName" placeholder="name" 
                                   onChange={handleChange}
                                   onBlur={handleBlur} />
                            
                            {errors.userName && touched.userName && <div>{errors.userName}</div>}

                            <Field type="password" name="password" placeholder="password" 
                                   onChange={handleChange}
                                   onBlur={handleBlur} />
                           
                            {errors.passWord && touched.passWord && <div>{errors.passWord}</div>}

                            <Field type="text" name="email" placeholder="email address" 
                                   onChange={handleChange}
                                   onBlur={handleBlur} />
                            {/* Manually display error message for email */}
                            {errors.email && touched.email && <div>{errors.email}</div>}

                            <button type="submit">create</button>
                        </Form>
                    )}
                </Formik>
                <p className="message">Already registered? <a href="#">Sign In</a></p>
                </>
    );
};

export default RegistrationForm;