import styled from 'styled-components';

export const SearchResultsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 10px;
`;

export const Message = styled.p`
  color: ${(props) => props.theme.colors.textMuted};
  font-style: italic;
`;

export const ResultItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.02);
  padding: 10px;
  border-radius: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BaseButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
`;

export const DetailsButton = styled(BaseButton)`
  background-color: ${(props) => props.theme.colors.buttonDetail};
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonDetailHover};
  }
`;

export const LibraryButton = styled(BaseButton)`
  /* USO DE PROPS DINÁMICAS EXIGIDO EN LA TAREA */
  background-color: ${(props) => 
    props.$added ? props.theme.colors.buttonDetail : props.theme.colors.primary};
  
  color: ${(props) => 
    props.$added ? props.theme.colors.textMuted : props.theme.colors.text};
  
  cursor: ${(props) => (props.$added ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => 
      props.$added ? props.theme.colors.buttonDetail : props.theme.colors.primaryHover};
  }
`;
