import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { authenticate } from '../services/authenticate';
import userpool from '../userpool'
import { Button, TextField, Typography } from '@material-ui/core';


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

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
      }
      else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          authenticate(email, password)
            .then((data) => {
              setLoginErr('');
              history.push('/dashboard');
            }, (err) => {
              console.log(err);
              setLoginErr(err.message)
            })
            .catch(err => console.log(err))
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <div className="login signup-container">
      <div className="signup">
        <h1 style={{ fontSize: '25px', color: 'black' }}>Login</h1>
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
            <div className="button-container">
              <Button type='submit' variant='contained' onClick={handleClick}>Login</Button>
              <Button type='submit' variant='contained' onClick={() => history.push('/signup')}>Signup</Button>
            </div>
          </div>
          <Typography  style={{color:'red'}} variant="body">{loginErr}</Typography>
        </div>
      </div>
    </div>
  )
}

export default Login