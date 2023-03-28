import { Button as MuiButton, styled } from '@mui/material'

const Button = ({
   children,
   width,
   onClick,
   hover,
   active,
   disabled,
   bgcolor,
   ...props
}) => {
   return (
      <StyledButton
         onClick={onClick}
         disabled={disabled}
         bgcolor={bgcolor}
         hover={hover}
         active={active}
         width={width}
         {...props}
      >
         {children}
      </StyledButton>
   )
}

export default Button

const StyledButton = styled(MuiButton)((props) => ({
   width: props.width || '122px',
   height: '32px',
   borderRadius: '26px',
   color: props.bgcolor === '#F0F0F0' ? '#919191' : '#FFFFFF',
   background: props.bgcolor || '#0079BF',
   fontSize: '14px',
   textTransform: 'none',
   padding: '8px 16px',
   fontWeight: '400',
   '&:hover': {
      background: props.hover || '#005688',
   },
   '&:active': {
      background: props.active || '#57AEE0',
   },
   '&&&': {
      '&.Mui-disabled ': {
         color: '#e1dfdf',
         background: '#AFAFAFcd',
      },
   },
}))
