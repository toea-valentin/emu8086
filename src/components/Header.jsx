import React from "react";
import styled from "styled-components";

const AppBar = styled.header`
  min-height: 70px;
  background-color: #4d5168;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 50%);
  margin-bottom: 25px;
`;

const Logo = styled.a`
  text-shadow: 4px 4px 4px black;
  color: white;
  font-weight: bolder;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const Header = () => {
  return (
    <AppBar className="p-3 d-flex align-items-center justify-content-between">
      <Logo>EMU8086</Logo>
    </AppBar>
  );
};

export default Header;
