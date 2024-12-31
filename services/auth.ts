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

const authenticate = async (
    mode: 'signUp' | 'signInWithPassword',
    email: string,
    password: string
) => {
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
            console.error(error);
            return error.response.data;
        } else {
            console.error(error);
            throw new Error('An unknown error occurred');
        }
    }
};

export const signUp = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return authenticate('signUp', email, password);
};

export const signIn = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    return authenticate('signInWithPassword', email, password);
};
