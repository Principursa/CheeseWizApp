import styled from 'styled-components'
import { Button } from 'rebass'

export interface LayoutProps  { 
   children: React.ReactNode
   onClick: () => void
}
const StyledButton = styled(Button)`
background-color: #36368114;
padding: 40px;
//font-family: 'Roboto', sans-serif;
transition: all 1s ease-out;
box-shadow:0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2); 
:hover {
  background-color: #2e2ec430;
}
::selection {
  background-color: #a13398c5;
}
`
  

const ButtonStyled:React.FC<LayoutProps>= ({children, onClick }) => {

    return (
        <StyledButton type="button" onClick={onClick}>
            {children}
        </StyledButton>
    )
}

export default ButtonStyled
