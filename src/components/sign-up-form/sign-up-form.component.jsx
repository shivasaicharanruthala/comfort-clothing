import {useState} from "react";

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firbase.utils";
// import { UserContext } from "../../contexts/user.context";

import Button from "../button/button.component";
import FormInput from "../from-input/form-input.component";

import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    // const { setCurrentUser } = useContext(UserContext);


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password didnt match!");

            return;
        }
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName: displayName, createdAt: new Date()});

            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert("Cannot create user, user with email already exists!!!");
            } else {
                console.error("user creation error: ", err);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your Email and Password </span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions = {{
                        type: 'text',
                        required: true,
                        onChange: handleChange,
                        name:'displayName',
                        value: displayName
                    }}
                />

                <FormInput
                    label='Email'
                    inputOptions={{
                        type:'email',
                        required: true,
                        onChange: handleChange,
                        name:'email',
                        value:email
                    }}
                />

                <FormInput
                    label='Password'
                    inputOptions={{
                        type:'password',
                        required: true,
                        onChange: handleChange,
                        name: 'password',
                        value: password
                    }}
                />

                <FormInput
                    label='Confirm Password'
                    inputOptions={{
                        type:'password',
                        required: true,
                        onChange: handleChange,
                        name: 'confirmPassword',
                        value: confirmPassword
                    }}
                />

                <Button type='submit'> Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;