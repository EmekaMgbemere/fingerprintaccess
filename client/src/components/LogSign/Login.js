import React, { useRef, useState } from 'react';
import Swal from "sweetalert2";
import logo from '../pics/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const [newloginid, setLoginId] =useState([]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
        }

    const formRef = useRef(null);

    const navigate = useNavigate();
    
    const showSuccessAlert = () => {
        let timerInterval;

        Swal.fire({
            title: 'Data Sent Successfully!',
            icon: 'success',
            position: 'center',
            timer: 1000,
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
            title: 'Data Not Sent!',
            text: "Try Again",
            icon: 'error',
            position: 'center',
            timer: 2000,
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
            },
        })
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
          alert("One or more fields are empty.");
      }
  
      else if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
      }

        try {
          const resp = await fetch('http://localhost:6969/loginuser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });
      
          const responseData = await resp.json();
          console.log(responseData);
      
          if (resp.status === 200) { 
              console.log('Form submitted:', { email, password });
      
              const secretCode = responseData.secretCode;
            if (secretCode) {
                localStorage.setItem('sc', secretCode);
              }
      
              const success = responseData.message;
              alert(success);
      
            //   const LoginId = responseData.user._id;
            //   setLoginId(LoginId);
      
              const LoginUser = responseData.user.fullname;
      
              alert(`THIS IS USER: ${LoginUser}`);
              showSuccessAlert();     
              navigate('/userinterface');
          } else {
              console.log('Login failed with status:');
              showErrorAlert();             
              formRef.current.reset();
          }
      
      } catch (e) {
          console.error('Error during login request:', e);
          showErrorAlert();
      }
    }

    

  return (
    <>
<div className='outpadding'>

<div className='middle leftloginpic'>

</div>

<div className='middle midright'>
        <div>
            <div className=''>
                <img src={logo} alt='logo' width={250} />
            </div>
            <div>
                <p className='fs-2'>Login</p>
            </div>
        <form onSubmit={handleSubmit} ref={formRef}>
            
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

            <div className='d-grid gap-2'>
                <button className='btn btn-dark Notifybutton' >
                    Login
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

export default Login


// import React, { useRef, useState } from 'react';
// import Swal from "sweetalert2";
// import logo from '../pics/logo.png';
// import { useNavigate } from 'react-router-dom';


// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpRequired, setOtpRequired] = useState(false);
//   const [token, setToken] = useState(null); 
  
//   const formRef = useRef(null);
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const showSuccessAlert = () => {
//     Swal.fire({
//       title: 'Data Sent Successfully!',
//       icon: 'success',
//       position: 'center',
//       timer: 1000,
//       showConfirmButton: false,
//     });
//   };

//   const showErrorAlert = () => {
//     Swal.fire({
//       title: 'Data Not Sent!',
//       text: "Try Again",
//       icon: 'error',
//       position: 'center',
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       alert("One or more fields are empty.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     try {
//       const resp = await fetch('http://localhost:6969/loginuser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const responseData = await resp.json();
//       console.log(responseData);

//       if (resp.status === 200) {
//         setToken(responseData.token); 
//         setUser(responseData.user); 
//         setOtpRequired(true); 
//         showSuccessAlert();
//       } else {
//         console.error('Login failed with status:', resp.status);
//         showErrorAlert();
//         formRef.current.reset(); 
//       }
//     } catch (e) {
//       console.error('Error during login request:', e);
//       showErrorAlert();
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const resp = await fetch('http://localhost:6969/verifyotp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ otp, token }),
//       });

//       const responseData = await resp.json();
//       if (resp.status === 200) {
//         alert('OTP verified successfully');
//         navigate('/userinterface'); 
//       } else {
//         alert('Invalid OTP, try again.');
//       }

//     } catch (e) {
//       console.error('Error during OTP verification:', e);
//     }
//   };

//   return (
//     <div className='outpadding'>
//       <div className='middle leftloginpic'></div>

//       <div className='middle midright'>
//         <div>
//           <img src={logo} alt='logo' width={250} />
//           <div>
//             <p className='fs-2'>Login</p>
//           </div>
//           {!otpRequired ? (
//             <form onSubmit={handleSubmit} ref={formRef}>
//               <div>
//                 <label htmlFor="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Email</label>
//                 <input
//                   value={email}
//                   type='email'
//                   placeholder='Enter email'
//                   onChange={(e) => setEmail(e.target.value)}
//                   className='col-12'
//                 />
//               </div>

//               <div>
//                 <label htmlFor="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Password</label>
//                 <input
//                   value={password}
//                   type='password'
//                   placeholder='Enter Password'
//                   onChange={(e) => setPassword(e.target.value)}
//                   className='col-12'
//                 />
//               </div>

//               <div className='d-grid gap-2'>
//                 <button className='btn btn-dark Notifybutton' type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleVerifyOtp}>
//               <div>
//                 <label htmlFor="otp">Enter OTP:</label>
//                 <input
//                   value={otp}
//                   type='text'
//                   placeholder='Enter OTP'
//                   onChange={(e) => setOtp(e.target.value)}
//                   className='col-12'
//                 />
//               </div>
//               <div className='d-grid gap-2'>
//                 <button className='btn btn-dark Notifybutton' type="submit">
//                   Verify OTP
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useRef, useState } from 'react';
// import Swal from "sweetalert2";
// import logo from '../pics/logo.png';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [newloginid, setLoginId] =useState([]);


//   const formRef = useRef(null);  
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const showSuccessAlert = () => {
//     Swal.fire({
//       title: 'Data Sent Successfully!',
//       icon: 'success',
//       position: 'center',
//       timer: 1000,
//       showConfirmButton: false,
//     });
//   };

//   const showErrorAlert = () => {
//     Swal.fire({
//       title: 'Data Not Sent!',
//       text: "Try Again",
//       icon: 'error',
//       position: 'center',
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       alert("One or more fields are empty.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     try {
//       const resp = await fetch('http://localhost:6969/loginuser', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const responseData = await resp.json();
//       console.log(responseData);

//       if (resp.status === 200) {

//         const secretCode = responseData.user.secretCode;
//         if (secretCode) {
//             localStorage.setItem('sc', secretCode);
//           }
    
//           const LoginId = responseData.user._id;
//           setLoginId(LoginId);

//         localStorage.setItem('user', JSON.stringify(responseData.user));
//         alert(`Welcome ${responseData.user}`)

//         showSuccessAlert();
//         navigate('/userinterface');  
//       } else {
//         console.error('Login failed with status:', resp.status);
//         showErrorAlert();
//         formRef.current.reset(); 
//       }

//     } catch (e) {
//       console.error('Error during login request:', e);
//       showErrorAlert();
//     }
//   };

//   return (
//     <>
//       <div className='outpadding'>
//         <div className='middle leftloginpic'></div>

//         <div className='middle midright'>
//           <div>
//             <div>
//               <img src={logo} alt='logo' width={250} />
//             </div>
//             <div>
//               <p className='fs-2'>Login</p>
//             </div>
//             <form onSubmit={handleSubmit} ref={formRef}>
//               <div>
//                 <label htmlFor="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Email</label>
//                 <input
//                   value={email}
//                   type='email'
//                   placeholder='Enter email'
//                   onChange={(e) => setEmail(e.target.value)}
//                   className='col-12'
//                 />
//               </div>

//               <div>
//                 <label htmlFor="colFormLabel" className="col-sm-2 col-form-label float-start rounded-pill">Password</label>
//                 <input
//                   value={password}
//                   type='password'
//                   placeholder='Enter Password'
//                   onChange={(e) => setPassword(e.target.value)}
//                   className='col-12'
//                 />
//               </div>

//               <div className='d-grid gap-2'>
//                 <button className='btn btn-dark Notifybutton' type="submit">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

