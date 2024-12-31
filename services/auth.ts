import axios from 'axios';
import { Alert } from 'react-native';

const FIREBASE_API_KEY = 'AIzaSyBNqnmNEJibRVDOJMdpblyJmP3nkYr3gMo';
const FIREBASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;

interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const authenticate = async (
    mode: 'signUp' | 'signInWithPassword',
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${FIREBASE_AUTH_URL}:${mode}?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            Alert.alert(
                'Authentication failed!',
                `Could not ${
                    mode === 'signUp' ? 'sign up' : 'log in'
                }. Please try again.`
            );
            return error.response.data;
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const signUp = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return await authenticate('signUp', email, password);
};

export const signIn = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return await authenticate('signInWithPassword', email, password);
};
