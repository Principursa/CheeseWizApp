import styled from 'styled-components'
import { Card } from 'rebass'

import React from 'react'
const Wrapper = styled(Card)`
//@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
//font-family: 'Roboto', sans-serif;
height: 40em;
text-align: center;
::selection {
  background-color: blue;
}
font-size: 1.5em;
border-radius: 10px;
border: 4px solid;
border-color: black;
background-color: aeafb2;   
backdrop-filter: blur(4px);
color: white;
padding: 1.5em;
/* border: 5px solid;
border-image-slice: 1;
border-width: 4px;
border-color: #4343921c; */
display: flex;
flex-direction: column;
justify-content: space-around;
box-shadow:0px 8px 17px 2px rgba(0,0,0,0.14) , 0px 3px 14px 2px rgba(0,0,0,0.12) , 0px 5px 5px -3px rgba(0,0,0,0.2); 
@media (max-width:800px){
    font-size: 1em;
    padding: 1em;
}
`


  

const CardStyled = (props: any) => {
    return (
        <div>
            <Wrapper>
               {props.children}

            </Wrapper>
            
        </div>
    )
}

export default CardStyled
