import { useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firbase.utils";
// import { UserContext } from "../../contexts/user.context";

import Button from "../button/button.component";
import FormInput from "../from-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
       await signInWithGooglePopup();
        // await createUserDocumentFromAuth(user, {});
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);

            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for the email!!!");
                    break
                case 'auth/user-not-found':
                    alert("User with this email not found!!!");
                    break
                default:
                    console.error("user creation error: ", err);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your Email and Password </span>
            <form onSubmit={handleSubmit}>
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

                <div className='buttons-container'>
                    <Button type='submit'> Sign In </Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}> Google sign in </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;