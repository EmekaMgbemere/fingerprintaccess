import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import padlockicon from '../pics/padlockicon.png'

const Logincar = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const navigate = useNavigate();
  
  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:6969/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'austinemgbemere@gmail.com' }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage('OTP has been sent successfully!');
          setOtpSent(true);
        } else {
          setError('Failed to send OTP');
        }
      } else {
        setError('Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred while sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:6969/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'austinemgbemere@gmail.com',
          otp,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAccessGranted(true);
        setMessage('OTP verified successfully! You now have access.');
        navigate('/userinterface')
        localStorage.setItem('otpVerified', true);
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred while verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className='outpadding'>
    <div className='outpaddingout'>
        <div className='text-center'>
          <img src={padlockicon} alt='padlockicon' className='w-25 my-3'/>
            {!otpSent ? (
                <div className='text-center'>
                    <button onClick={handleSendOtp} disabled={loading} className='btn btn-primary btn-lg'>
                        {loading ? 'Sending OTP...' : 'Dashboard'}
                    </button>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </div>
            ) : (
                <div>
                  <div>
                      <input
                          className='border border-radius-2'
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className='my-2'>
                        <button onClick={handleVerifyOtp} disabled={loading} className='btn btn-primary p-2 m-2'>
                            {loading ? 'Verifying OTP...' : 'Verify OTP'}
                        </button>
                        {message && <p style={{ color: 'green' }}>{message}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
            )}

            {accessGranted && "Welcome"}
        </div>
    </div>
</div>

        );
        };



export default Logincar;