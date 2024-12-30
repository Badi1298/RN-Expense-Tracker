import axios from 'axios';

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

export const signUp = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
        `${FIREBASE_AUTH_URL}:signUp?key=${FIREBASE_API_KEY}`,
        {
            email,
            password,
            returnSecureToken: true,
        }
    );
    return response.data;
};

export const signIn = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(
        `${FIREBASE_AUTH_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
            email,
            password,
            returnSecureToken: true,
        }
    );
    return response.data;
};