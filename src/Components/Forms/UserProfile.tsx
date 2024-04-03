import { Avatar, Button } from "@mui/material";
import {  Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { updateUserProfile } from "../../redux/Slices/UserSlice";
import { Profile } from "../../models/Profile";
import { CustomTextInput } from "../FormComponents/CustomTextInput";
import * as Yup from 'yup';
import { useRef } from "react";
import { uploadImage } from "../../redux/Slices/UserSlice";




const ProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    userName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')
});

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
     
    const initialProfileValues = {
        email: user?.Email || '',
        userName: user?.UserName || '',
        firstName: user?.FirstName || '',
        lastName: user?.LastName || '',
       
    };

    const handleProfileSubmit = (values: Profile) => {
       
        dispatch(updateUserProfile(values));
    };

    
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => {
        
        const fileInput = fileInputRef.current as HTMLInputElement | null;
        if (fileInput) {
            fileInput.click();
        }
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            dispatch(uploadImage(file)); 
        }
    };

    

    return (
        <div className="login-page">
            <div className="form">
                <Formik
                    initialValues={initialProfileValues}
                    validationSchema={ProfileSchema}
                    onSubmit={handleProfileSubmit}
                >
                    {({  }) => (
                        <Form className="login-form">
                           
                                    <Avatar
                                        src={ user?.ImageUrl|| '/default-avatar.png'}
                                        alt="Profile"
                                        sx={{ width: 90, height: 90, cursor: 'pointer' }} 
                                        onClick={handleAvatarClick}
                                    />
                                    
                                
                                    <CustomTextInput type="text" name="email" placeholder="Email" />
                                    <CustomTextInput type="text" name="userName" placeholder="Username" />
                                    <CustomTextInput type="text" name="firstName" placeholder="First Name" />
                                    <CustomTextInput type="text" name="lastName" placeholder="Last Name" />
                                    
                                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>
                                        Update 
                                    </Button>
                                
                        </Form>
                    )}
                </Formik>
            </div>
            <input
                type="file"
                id="profile-image-input"
                hidden
                onChange={handleImageChange} 
                accept="image/*" 
                ref={fileInputRef}
            />
        </div>
    );
}