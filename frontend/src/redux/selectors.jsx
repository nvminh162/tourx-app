// Auth selectors
export const currentUserSelector = (state) => state.auth.currentUser
export const isLoggedInSelector = (state) => state.auth.isLoggedIn
export const loginMessageSelector = (state) => state.auth.loginMessage
export const authErrorsSelector = (state) => state.auth.errors
export const rememberMeSelector = (state) => state.auth.rememberMe
export const loginCredentialsSelector = (state) => state.auth.loginCredentials

// Signup selectors
export const signupFormDataSelector = (state) => state.signup.formData
export const signupErrorsSelector = (state) => state.signup.errors
export const signupMessageSelector = (state) => state.signup.signupMessage
export const isSubmittingSelector = (state) => state.signup.isSubmitting

// Forgot Password selectors
export const forgotPasswordEmailSelector = (state) => state.forgotPassword.email
export const forgotPasswordErrorSelector = (state) => state.forgotPassword.error
export const emailSentSelector = (state) => state.forgotPassword.emailSent