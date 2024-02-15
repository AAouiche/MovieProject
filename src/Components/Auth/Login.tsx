import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginUser, registerUser } from "../../redux/Slices/UserSlice";
import { LoginForm } from "../../models/login";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterForm } from "../../models/Register";
import { CustomTextInput } from "../FormComponents/CustomTextInput";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    passWord: Yup.string().required('Required')
});
const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    passWord: Yup.string().min(6, 'Too Short!').required('Required'),
    userName: Yup.string().required('Required')
});

type LoginProp={
    bool:boolean;
};

export default function Login({bool}:LoginProp) {
    const dispatch = useDispatch<AppDispatch>(); 
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(bool);

    const toggleForm = () => {
        setShowLogin(current => !current);
    };
    
    const handleLoginSubmit = async (values: LoginForm) => {
        const resultAction = await dispatch(loginUser(values));
    
        if (loginUser.fulfilled.match(resultAction)) {
            
            navigate("/dashboard");
        } else if (loginUser.rejected.match(resultAction)) {
           
           
            console.error('Login failed:', resultAction.error.message);
        }
    };
    const handleRegisterSubmit = async (values: RegisterForm) => {
        console.log("register");
        const resultAction = await dispatch(registerUser(values));
        
        if (registerUser.fulfilled.match(resultAction)) {
           
            const loginDetails = { email: values.email, passWord: values.passWord };
            const loginResult = await dispatch(loginUser(loginDetails));
    
            if (loginUser.fulfilled.match(loginResult)) {
                navigate("/dashboard");
            } else {
               
                console.error('Login failed after registration:', loginResult.error?.message);
            }
        } else if (registerUser.rejected.match(resultAction)) {
            console.error('Register failed:', resultAction.error?.message);
        }
    };

    
    
    return (
        <div className="login-page">
            <div className="form">
                {showLogin ?
                    (<Formik
                        initialValues={{ email: '', passWord: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleLoginSubmit}
                    >
                        {() => (
                            <Form className="login-form">
                                <CustomTextInput type="text" name="email" placeholder="Email" />
                                
                                <CustomTextInput type="password" name="passWord" placeholder="Password" />
                                <button type="submit">Login</button>
                            </Form>
                        )}
                    </Formik>
                    ) : (
                        <Formik
                        initialValues={{ email: '', passWord: '', userName: '' }}
                        validationSchema={RegistrationSchema}
                        onSubmit={handleRegisterSubmit}
                        >
                        {() => (
                            <Form className="login-form">
                                <CustomTextInput type="text" name="email" placeholder="Email" />
                                <CustomTextInput type="password" name="passWord" placeholder="Password" />
                                <CustomTextInput type="text" name="userName" placeholder="Username" />
                                <button type="submit">Register</button>
                            </Form>
                        )}
                        </Formik>
                    )
                }
                <p className="message">
                    {showLogin ? "Not registered? " : "Already registered? "}
                    <a  onClick={toggleForm}>
                        {showLogin ? "Create an account" : "Sign In"}
                    </a>
                </p>
            </div>
        </div>
    );
};