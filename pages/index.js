import React, {useEffect, useState, useContext} from 'react'

import { ChatDappContext } from '../context/ChatDappContext'
import {Filter, Friend} from '../components/index'

const ChatDapp = () => {

  // const {} = useContext(ChatDappContext);
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  )
}

export default ChatDapp