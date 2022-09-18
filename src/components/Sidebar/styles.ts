import styled from 'styled-components';

interface SidebarProps {
  isEmpty?: boolean;
}

export const SideBarWrapper = styled.aside`
  background-color: transparent;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

export const SideBarList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SideBarItem = styled.li<SidebarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.4rem;
  height: 6.4rem;
  border: 4px solid ${(props) => (props.isEmpty ? '#004a45' : '#00D68F')};
  border-radius: 12.8rem;
  font-size: 4rem;
  font-weight: bold;
  color: #004a45;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.isEmpty ? '#00d68f' : '#ffffff')};

  &:hover {
    background-color: #004a45;
    color: #00d68f;
  }

  &:not(last-of-type) {
    margin-bottom: 1.6rem;
  }
`;

export const SideBarImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
`;
