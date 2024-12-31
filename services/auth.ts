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
): Promise<string> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${FIREBASE_AUTH_URL}:${mode}?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        return response.data.idToken;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const signUp = (email: string, password: string): Promise<string> => {
    return authenticate('signUp', email, password);
};

export const signIn = (email: string, password: string): Promise<string> => {
    return authenticate('signInWithPassword', email, password);
};
