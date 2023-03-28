import * as Yup from 'yup'

const isPasswordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const schema = Yup.object().shape({
   name: Yup.string()
      .typeError('should be a string')
      .required('Name is a required field')
      .min(4, 'Name must be at least 4 characters'),

   surname: Yup.string()
      .required('Surname is a required field')
      .min(5, 'Surname must be at least 5 characters'),

   email: Yup.string()
      .required('Email is a required field')
      .email('Incorrect email address'),

   password: Yup.string()
      .matches(isPasswordValidator, {
         message: 'please add number and capital letter',
      })
      .required('Please Enter your password')
      .min(8, 'Password must be at least 8 characters'),

   retypePassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
   ),

   remember: Yup.bool().oneOf([true], ' '),
})

export const validationSchemaSigIn = Yup.object().shape({
   email: Yup.string()
      .required('Email is a required field')
      .email('Invalid email format'),

   password: Yup.string().required('Please Enter your password'),
})

export const validationEmailInForgotPassword = Yup.object({
   email: Yup.string()
      .max(30, 'maximum 30 characters')
      .email('incorrect email address')
      .required('required field'),
})

export const validationForgotPassword = Yup.object().shape({
   password: Yup.string()
      .matches(isPasswordValidator, {
         message: 'please add number and capital letter',
      })
      .required('Please Enter your password')
      .min(8, 'Password must be at least 8 characters'),

   retypePassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
   ),
})
export const validationProfileForm = Yup.object().shape({
   email: Yup.string().required('Please enter email'),
   name: Yup.string().required('Please enter name'),
   surname: Yup.string().required('Please enter surname'),
   password: Yup.string(),
   repeatpassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'password must match'
   ),
})
export const workspaceValidation = Yup.object().shape({
   name: Yup.string().min(4).max(25).required('Name is required field'),
   email: Yup.string().email('Invalid email address'),
})

export const inviteEmail = Yup.object().shape({
   email: Yup.string().required().email(),
})

export const updateWorkspaceNameValidation = Yup.object().shape({
   name: Yup.string().required(''),
})

export const labelCardModal = Yup.object().shape({
   label: Yup.string()
      .min(4, 'less than 4 words')
      .max(12, 'less than 12 words'),
})
