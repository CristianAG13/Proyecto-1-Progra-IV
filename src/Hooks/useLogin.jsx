import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../services/LoginService'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    // 1) the actual POST /login call
    mutationFn: async ({ email, password }) => {
      return await login({ email, password })
    },

    // 2) on success: you could cache the token or user data if you like
    onSuccess: (token) => {
      // e.g. cache the raw token under a query key
      queryClient.setQueryData(['authToken'], token)
      // or invalidate a 'me' query so your app can refetch current-user info
      // queryClient.invalidateQueries(['me'])
    },

    // 3) on error: log or transform the error
    onError: (err) => {
      console.error('Login failed:', err)
    },
  })
}

