import React from 'react'
import { styled } from '@mui/material'

const NotFoundPage = () => {
   return (
      <StyledWrapper>
         <StyledContainer>
            <h2> Oops! Page not found .</h2>
            <h1>404</h1>
            <p>
               We {`can't`} find the page {`you're`} looking for .
            </p>
            <a href="/">Go back home</a>
         </StyledContainer>
      </StyledWrapper>
   )
}
const StyledWrapper = styled('div')(() => ({
   width: '100%',
   height: '100%',
   position: 'absolute',
   background:
      'linear-gradient(45deg, rgb(246, 154, 91) 10%,rgb(206, 226, 255)30%,rgb(231, 235, 238) 90%)',
}))
const StyledContainer = styled('div')(() => ({
   width: '100%',
   position: 'absolute',
   top: '50%',
   transform: 'translateY(-50%)',
   textAlign: 'center',
   color: '#343434',
   '& h1': {
      fontSize: '160px',
      margin: '0',
      fontWeight: '900',
      letterSpacing: '20px',
      background:
         'url(https://i.pinimg.com/736x/b9/59/f1/b959f1670d2631589643575de5a782b7.jpg) center no-repeat',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
   },
   '& a': {
      textDecaration: 'none',
      background: '#e55039aa',
      color: '#fff',
      padding: '12px 24px',
      display: 'inline-block',
      borderRadius: '25px',
      fontSize: '14px',
      textTransform: 'uppercase',
      transition: '0.4s',
      ':hover': {
         background: '#E55039',
      },
   },
}))
export default NotFoundPage
