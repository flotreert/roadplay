import {useQuery, useMutation, UseMutationOptions} from '@tanstack/react-query';
import { AuthService } from '@/client';

const actions = {
    login: () => ({
        mutationFn: (data: {username: string, password: string}) => AuthService.loginForAccessTokenTokenLoginPost({formData: data}),
        mutationKey: ['login', 'login'],
        onSuccess: (data: any) => {
            console.log('Logged in successfully with token: ' + data.access_token);
            localStorage.setItem('user', data.access_token);
        },
        onError: (error: any) => {
            window.alert('Error logging in' + error);
        }
    }),
    refreshToken: () => ({
        mutationFn: () => AuthService.refreshTokenTokenRefreshPost(),
        mutationKey: ['refreshToken', 'refresh'],
        onSuccess: (data: any) => {
            console.log('Token refreshed successfully');
            localStorage.setItem('user', data.access_token);
        },
        onError: (error: any) => {
            window.alert('Error refreshing token' + error);
        }
    }),
    signUp: () => ({
        mutationFn: (data: {username: string, password: string, email: string}) => AuthService.createUserCreatePost({requestBody: data}),
        mutationKey: ['signUp', 'signUp'],
        onSuccess: (data: any) => {
            console.log('User created successfully');
            localStorage.setItem('user', data.access_token);
        },
        onError: (error: any) => {
            window.alert('Error creating user' + error);
        }
    }),

}

export const useLogin = () => {
    return useMutation(actions.login());
}

export const useRefreshToken = () => {
    return useMutation(actions.refreshToken());
}

export const useSignUp = () => {
    return useMutation(actions.signUp());
}

