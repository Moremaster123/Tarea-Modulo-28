import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.surface || '#181818'};
  padding: 20px 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border || '#292929'};
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.primary || '#1DB954'};
  font-weight: 700;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.span`
  color: ${(props) => props.theme.colors.text || '#ffffff'};
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary || '#1DB954'};
  }
`;
