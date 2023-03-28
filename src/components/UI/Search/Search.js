import React, { useCallback } from 'react'
import { InputAdornment, TextField, styled } from '@mui/material'
import { IconSearch } from '../../../assets/icons'

const Search = ({
   value,
   onChange,
   label,
   iconVariant,
   type,
   InputProps,
   error,
   placeholder,
   ...props
}) => {
   const iconChangeHandlerVariant = useCallback(() => {
      const positionAdornment =
         iconVariant === 'end' ? 'endAdornment' : 'startAdornment'

      return {
         [positionAdornment]: (
            <InputAdornment position={iconVariant}>
               <ImgIconSearch src={ImgIconSearch} alt="icon" />
            </InputAdornment>
         ),
      }
   }, [iconVariant])

   return (
      <Input
         label={label}
         placeholder={placeholder}
         size="small"
         fullWidth
         value={value}
         onChange={onChange}
         type={type}
         error={error}
         InputProps={{
            ...InputProps,
            ...iconChangeHandlerVariant(),
            classes: { root: 'input' },
         }}
         {...props}
      />
   )
}
export default Search

const Input = styled(TextField)(() => ({
   '& .input': {
      border: '1px solid #AFAFAF',
      borderRadius: '8px',
      background: '#FFFFFF',
      color: 'black',
      padding: '0px 4px 0px 8px',
   },

   '& .input.Mui-error': {
      border: '1px solid red',
   },

   '& .input:not(.Mui-error):hover': {
      border: '1px solid #0079BF',
   },

   '&:focus': {
      border: '1px solid #919191',
      color: '#919191',
      '& .MuiInputLabel-root': {
         color: '#919191',
      },
   },

   '& .MuiInputLabel-root': {
      color: '#AFAFAF',
      fontSize: '16px',
      background: 'white',
      padding: '0px 4px 0px 8px',
   },

   '& .MuiInputLabel-root.Mui-focused': {
      left: '6px',
      fontSize: '14px',
      color: '#AFAFAF',
   },

   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
}))

const ImgIconSearch = styled(IconSearch)(() => ({
   color: '#B2B2B2',
   width: '12px',
   height: '17px',
}))
