import React from "react";

import ServerButton from "../ServerButton";
import {Container, Separator} from './styles';

const ServerList: React.FC = () => {
  return (
    <Container>
      <ServerButton isHome/>

      <Separator/>

      <ServerButton/>
      <ServerButton hasNotifications/>
      <ServerButton mentions={5}/>
      <ServerButton/>
      <ServerButton/>
      <ServerButton/>
      <ServerButton hasNotifications/>
      <ServerButton/>
      <ServerButton/>
      <ServerButton/>
      <ServerButton mentions={28}/>
    </Container>
  )
};

export default ServerList;