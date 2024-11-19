import React from 'react';
import { useState } from 'react';
import logo from '../pics/logo.png';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const[fullname, setFullName] = useState('');
    const[emailError, setEmailError] = useState('');

    const navigate = useNavigate('/login');

    const showSuccessAlert = () => {
        let timerInterval;

        Swal.fire({
            title: 'Data Sent Successfully!',
            icon: 'success',
            position: 'center',
            timer: 1500,
            showConfirmButton: false,
            didOpen: () => {
                const timer = Swal.getPopup().querySelector("b");
                if (timer) {
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })}

    
    const showErrorAlert = () => {
        let timerInterval;

        Swal.fire({
            title: 'Error!',
            text: "Something went wrong!",
            icon: 'error',
            position: 'center',
            timer: 1500,
            showConfirmButton: false,
            didOpen: () => {
                const timer = Swal.getPopup().querySelector("b");
                if (timer) {
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
        
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
            }

        const validatePhoneNumber = (number) => {
            const regex = /^[0-9]{8,}$/;
            return regex.test(number);
        }
      
    const formData = { email, password, number, fullname};

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !number || !fullname ) {
        alert("One or more fields are empty.");
        return;
    }

    else if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        alert('Please enter a valid email address.');
        return; 
    } 

    else if (!validatePhoneNumber(number)) {
        alert('Enter a Valid Phone Number');
        return; 
    } else {
        setEmailError(''); 
    }


            try{
                    const resp = await fetch('http://localhost:6969/signupuser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                        }         
                    )

                    if (resp.status === 201) {
                        setEmail('');
                        setPassword('');
                        setNumber('');
                        setFullName('');
                        showSuccessAlert();
                        navigate('/login');
                        } 
                    else {
                        console.error('An error occurred while submitting the form.');
                        showErrorAlert();
                    }
                    } 
                    
                    catch (e) {
                        console.log(e);
                    }
    }
  return (

<>
    <div className='outpadding'>

        <div className='middle midpic'>

        </div>

        <div className='middle midright'>
                <div>
                    <div className=''>
                        <img src={logo} alt='logo' width={250} />
                    </div>
                    <div>
                        <p className='fs-2'>Signup</p>
                    </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label for="colFormLabel" className="col-form-label float-start rounded-pill">Full Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter Full Name'
                            onChange={(e) => setFullName(e.target.value)}
                            className='col-12'
                        />
                    </div>
                    <div>
                        <label for="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Email</label>
                        <input 
                            value={email} 
                            type='email' 
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                            className='col-12'
                        />
                    </div>

                    <div>
                        <label for="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Password</label>
                        <input value={password} 
                                type='password' 
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='col-12'
                        />
                    </div>

                    <div>
                        <label for="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Phone</label>
                        <input value={number} 
                                type='text' 
                                placeholder='Enter Number'
                                onChange={(e) => setNumber(e.target.value)}
                                className='col-12'
                        />
                    </div>

                    <div className='d-grid gap-2'>
                        <button className='btn btn-dark Notifybutton' type="submit" onClick={handleSubmit} >
                            Register
                        </button>
                    </div>
                </form>
                </div>
                <div></div>
        </div>

        <div>

        </div>
    </div>
</>
  )
}

export default Signup;