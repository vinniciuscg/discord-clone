import React, {useRef, useEffect} from "react";

import { Container, Messages, InputWrapper, Input, InputIcon } from "./styles";
import ChannelMessage, { Mention } from "../ChannelMessage";

const ChannelData: React.FC = () => {
  const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const div = messagesRef.current;

    if(div){
      div.scrollTop = div.scrollHeight;
    }
  }, [messagesRef]);

  return(
    <Container>
      <Messages ref={messagesRef}>
        {
          Array.from(Array(30).keys()).map((n) => (
            <ChannelMessage 
              key={n}
              author="Marcos Vinicius" 
              date='04/02/2022' 
              content='Esta é uma mensagem.'
            />
          ))
        }
        <ChannelMessage 
          author="Marcos Vinicius" 
          date='04/02/2022' 
          content={
            <>
              <Mention>@Luís Felipe</Mention>, favor varrer a casa.
            </>
          }
          hasMention
          isBot
        />
      </Messages>

      <InputWrapper>
        <Input type="text" placeholder="Conversar em #chat-livre" />
        <InputIcon />
      </InputWrapper>
    </Container>
  )
};

export default ChannelData;