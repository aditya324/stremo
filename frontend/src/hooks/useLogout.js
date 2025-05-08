import React from 'react'
import { logout } from '../../lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useLogout = () => {
    const queryClient = useQueryClient()
   const authuser =  useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        }
    })

    return{
        logoutMutation: authuser.mutate
        
    }
    
}

export default useLogout