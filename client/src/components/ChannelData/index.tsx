import React, {useRef, useEffect, useState} from "react";
import Axios from 'axios';

import { Container, Messages, InputWrapper, Input, InputIcon } from "./styles";
import ChannelMessage, { Mention } from "../ChannelMessage";

const API_URL=process.env.REACT_APP_HOST
const AMOUNT_OF_MESSAGES_TO_SEND = 5

interface MessageItem {
  author: string, 
  content: string,
  date: string,
  bot: boolean,
  mention: boolean
}

const ChannelData: React.FC = () => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [newMessage, setNewMessage] = useState('')
  const [unsentMessages, setUnsentMessages] = useState<MessageItem[]>([])
  const [messagesArray, setMessagesArray] = useState<MessageItem[]>([])
  const [buscar, setBuscar] = useState(0)

  useEffect(() => {
    const div = messagesRef.current;

    if(div){
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);

  useEffect(() => {
    fetchMessages()
  }, [buscar])

  const fetchMessages = () => {    

    Axios.get(`${API_URL}/api/getFromRedis`).then((response) => {
        let messages = Array.from(response.data).map(item => {
          let it = item as MessageItem
          return {
            author: it.author,
            content: it.content,
            date: it.date,
            bot: it.bot,
            mention: it.mention}
        })

        //setUnsentMessages([])
        //messagesArray.concat(messages)
        //setMessagesArray([])
        setMessagesArray(messages)
      })
  }

  const sendToServer = async (route: string) => {
    console.log('aqui');
    
    if(route.includes('toRedis')){
      await Axios.post(`${API_URL}/api/${route}`, {
        messagesArray
      })
    }else{
      await Axios.post(`${API_URL}/api/${route}`, {
        unsentMessages, messagesArray
      })
    }
  }

  const fetchFromDatabase = () => {
    Axios.get(`${API_URL}/api/getFromDB`).then((response) => {
        let messages = Array.from(response.data).map(item => {
          let it = item as MessageItem
          return {
            author: it.author,
            content: it.content,
            date: it.date,
            bot: it.bot,
            mention: it.mention}
        })
        setUnsentMessages([])
        setMessagesArray(messages)
    })
  }

  const submitMessages = async(body: MessageItem) => {
  
    unsentMessages.push(body)
    //messagesArray.push(body)
    //setUnsentMessages([...unsentMessages, body])
    console.log(body);
    
    
    if(unsentMessages.length >= AMOUNT_OF_MESSAGES_TO_SEND){
      sendToServer('toDB/byArray')

      setTimeout(() => {
        fetchFromDatabase()
      }, 500);
    }else{
      //sendToServer('toRedis')
    }

    //console.log(messagesArray);
    //"{\"author\":\"Vine\",\"content\":\"1\",\"date\":\"30/03/2022 - 21:46:31\",\"bot\":false,\"mention\":false}

  }
  
  return(
    <Container>
      <Messages ref={messagesRef}>
        {
          messagesArray.concat(unsentMessages).map((msg) => {            
            return (<ChannelMessage
              key={Math.random()} 
              {...msg}
            />)
            })
        }
        <ChannelMessage 
          author="Fulano" 
          date='23/03/2022 - 21:56:00' 
          content='vamo um lolzin?'
          hasMention
          isBot
        />
      </Messages>

      <InputWrapper>
        <Input type="text" value={newMessage} placeholder="Conversar em #chat-livre" onChange={(e)=>{setNewMessage(e.target.value)}} 
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            if(newMessage){
              let now = new Date()
              submitMessages({
                  author: 'Vine', 
                  content: newMessage,
                  date: `${now.toLocaleDateString().concat(` - ${now.toLocaleTimeString()}`)}`,
                  bot: false,
                  mention: false
                })
              
                setNewMessage('')
                setBuscar(now.getTime())
            }
          }
        }} />
        <InputIcon />
      </InputWrapper>
    </Container>
  )
};

export default ChannelData;