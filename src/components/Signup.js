
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import './signup.css';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Button, TextField } from '@material-ui/core';

const poolData = {
    UserPoolId: 'us-east-1_zfCz2S91S',
    ClientId: '72h2o45hj1vk3gj7ftdb82t5hm'
  };
  const UserPool = new CognitoUserPool(poolData);
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

        if (formField === "cnf-password") {
            setCnfPassword(value);
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
            } else if (password !== cnfpassword) {
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
        setPassword("");
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
                    UserPool.signUp(username, password, [], null, (err, data) => {
                        if (err) {
                            console.log(err);
                             let error = err.toString();
                             if(error.split(" ")[0]==="CodeDeliveryFailureException:"){
                             alert("Request sent. Wait for the confirmation from admin");
                             history.push('/') 
                            }
                            else if(error.split(" ")[0]==="UsernameExistsException:"){
                            alert("User already exists");
                            history.push('/')   
                            }
                            else if(error.split(" ")[0]==="InvalidPasswordException:"){
                            alert(" Password must be 8-character length, contains atleast 1 number, atleast 1 lowercaseletter, atleast 1 uppercase letter, Contains at least 1 special character");
                        }
                        } else {
                            console.log(data);
                             alert('User Added Successfully');
                             history.push('/')
                        }
                    });
                }
            }, err => console.log(err))
            .catch(err => console.log(err));
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h1 style={{ fontSize: '25px', color: 'black' }}>Signup</h1>
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
                            value={cnfpassword}
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