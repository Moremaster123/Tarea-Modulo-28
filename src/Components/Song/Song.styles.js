import styled from 'styled-components';

export const SongContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface || '#181818'};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border || '#292929'};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SongTitle = styled.h3`
  color: ${(props) => props.theme.colors.text || '#ffffff'};
  font-size: 1.2rem;
  margin-bottom: 4px;
`;

export const SongInfo = styled.p`
  color: ${(props) => props.theme.colors.textMuted || '#a7a7a7'};
  font-size: 0.9rem;
`;
