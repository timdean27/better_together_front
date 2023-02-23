import React from 'react'

import FireBaseLogin from '../Components/Authentication/FireBaseLogin'
import CenterWebPage from './CenterWebPage'



const Home = ({currentUser}) => {
  return (
    <div>


      <FireBaseLogin currentUser={currentUser}/>
      <CenterWebPage/>

    </div>
  )
}

export default Home
