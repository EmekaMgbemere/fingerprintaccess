import React from 'react'

const Home = (props) => {
  const { loggedIn, email } = props

  return (
    <div className="">
      <div className=''>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className=''>
        <input
          className={'inputButton'}
          type="button"
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home