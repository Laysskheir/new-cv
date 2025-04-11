import { toast } from "sonner"

export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

export const validateForm = (data: SignUpData): string | null => {
  if (!data.firstName || !data.lastName || !data.email || !data.password || !data.passwordConfirmation) {
    return "All fields are required"
  }
  if (data.password !== data.passwordConfirmation) {
    return "Passwords do not match"
  }
  if (data.password.length < 8) {
    return "Password must be at least 8 characters long"
  }
  return null
}

export const handleSignUpError = (error: Error): string => {
  console.error("Sign up error:", error)
  return error.message || "An error occurred during sign up"
}

export const handleSocialSignInError = (provider: string, error: Error): string => {
  console.error(`${provider} sign in error:`, error)
  return `Error signing in with ${provider}`
}

export const showSuccessToast = () => {
  toast.success("Account created successfully")
}