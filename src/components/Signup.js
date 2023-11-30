
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import './signup.css';


import userpool from '../userpool';
import { Button, TextField } from '@material-ui/core';

const Signup = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const formInputChange = (formField, value) => {
        if (formField === "email") {
            setEmail(value);
        }
        if (formField === "password") {
            setPassword(value);
        }
    };

    const validation = () => {
        return new Promise((resolve, reject) => {
            if (email === '' && password === '') {
                setEmailErr("Email is Required");
                setPasswordErr("Password is required")
                resolve({ email: "Email is Required", password: "Password is required" });
            }
            else if (email === '') {
                setEmailErr("Email is Required")
                resolve({ email: "Email is Required", password: "" });
            }
            else if (password === '') {
                setPasswordErr("Password is required")
                resolve({ email: "", password: "Password is required" });
            }
            else if (password.length < 6) {
                setPasswordErr("must be 6 character")
                resolve({ email: "", password: "must be 6 character" });
            } else if (passwordErr === cnfpassword) {
                setPasswordErr("Password and confirm password should be same")
                resolve({ email: "", password: "Password and confirm password should be same" });
            }
            else {
                resolve({ email: "", password: "" });
            }
            reject('')
        });
    };

    const handleClick = (e) => {
        setEmailErr("");
        setPasswordErr("");
        setCnfPassword("");
        validation()
            .then((res) => {
                if (res.email === '' && res.password === '') {
                    const attributeList = [];
                    attributeList.push(
                        new CognitoUserAttribute({
                            Name: 'email',
                            Value: email,
                        })
                    );
                    let username = email;
                    userpool.signUp(username, password, attributeList, null, (err, data) => {
                        if (err) {
                            console.log(err);
                            alert("Couldn't sign up");
                        } else {
                            console.log(data);
                            alert('User Added Successfully');
                            history('/dashboard');
                        }
                    });
                }
            }, err => console.log(err))
            .catch(err => console.log(err));
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h1 style={{ fontSize: '25px' }}>Signup</h1>
                <div className='form'>
                    <div className="formfield">
                        <TextField
                            value={email}
                            onChange={(e) => formInputChange("email", e.target.value)}
                            label="Email"
                            helperText={emailErr}
                        />
                    </div>
                    <div className='formfield'>
                        <TextField
                            value={password}
                            onChange={(e) => { formInputChange("password", e.target.value) }}
                            type="password"
                            label="Password"
                            helperText={passwordErr}
                        />
                    </div>
                    <div className='formfield'>
                        <TextField
                            value={password}
                            onChange={(e) => { formInputChange("cnf-password", e.target.value) }}
                            type="password"
                            label="Confirm Password"
                            helperText={passwordErr}
                        />
                    </div>
                    <div className='formfield'>
                        <Button type='submit' variant='contained' onClick={handleClick}>Signup</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup;