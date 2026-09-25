import styled from 'styled-components';

export const SearchContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 600px;
  gap: 10px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.colors.border || '#292929'};
  background-color: ${(props) => props.theme.colors.surface || '#181818'};
  color: ${(props) => props.theme.colors.text || '#ffffff'};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary || '#1DB954'};
  }
`;

export const SearchButton = styled.button`
  padding: 12px 24px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.colors.primary || '#1DB954'};
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
