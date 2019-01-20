import styled from 'styled-components';

export const IconContainer = styled.div`
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  display: flex;
  width: 3.5rem;
  justify-content: space-between;
`;

export const CancelIconContainer = styled(IconContainer)`
  justify-content: flex-end;
`;

export const Icon = styled.i`
  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    box-shadow: none;
    color: #31437a;
  }

  opacity: 0.5;
  transition: opacity 0.3s;
  cursor: pointer;
`;

export const CancelIcon = styled(Icon)`
  transform: rotate(45deg);
`;
