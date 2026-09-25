import styled from 'styled-components';

export const LibraryContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

export const LibraryTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text || '#ffffff'};
  border-bottom: 1px solid ${(props) => props.theme.colors.border || '#292929'};
  padding-bottom: 10px;
`;
