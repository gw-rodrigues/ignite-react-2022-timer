import styled from 'styled-components'

export const LayoutContainer = styled.div`
  width: 90%;
  max-width: 74rem;
  min-height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  box-shadow: 0 10px 15px -8px black;
`
