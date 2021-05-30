import styled from 'styled-components';

export const StyledLogo = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  img {
    padding-right: 10px;
    height: 46px;
  }
  p {
    margin: 0;
    text-transform: uppercase;
    font-weight: 700;
  }
`;

export const StyledHeader = styled.header`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  min-width: 1250px;
  z-index: 1300;
  position: fixed;
  box-sizing: border-box;
  height: 60px;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 0 5px #999;
`;

export const StyledUserName = styled.p`
  display: inline-flex;
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  color: #555555;
  p {
    padding-right: 12px;
  }
`;

export const StyledAccount = styled.div`
  display: flex;
  p {
    margin: 0;
  }
`;
