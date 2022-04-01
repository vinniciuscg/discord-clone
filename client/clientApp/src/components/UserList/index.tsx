import React from "react";

import { 
  Container, 
  User,
  Avatar,
  Role } from "./styles";

interface UserProps {
  nickname: string;
  isBot?: boolean;
}

const UserRow: React.FC<UserProps> = ( {nickname, isBot} ) => {
  return(
    <User>
      <Avatar className={isBot ? 'bot' : ''} />

      <strong>{nickname}</strong>

      {isBot && <span>Bot</span> }
    </User>
  )
};

const UserList: React.FC = () => {
  return(
    <Container>
      <Role>Disponível - 1</Role>
      <UserRow nickname="Marcos Vinicius" />
      <Role>Offline - 18</Role>
      <UserRow nickname="Luís Felipe" isBot />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
      <UserRow nickname="Other User" />
    </Container>
  )
};

export default UserList;