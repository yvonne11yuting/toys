import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

export const fetchToken = async () => {
    try {
        // next/auth automatically published our token by default
        // https://next-auth.js.org/getting-started/rest-api
        const response = await fetch(`${serverUrl}/api/auth/token`)
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const uploadImage = async (imagePath: string, width: string, height: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath, width, height })
        })

        return response.json();
    } catch (error) {
        throw error;
    }
}

interface NotePayload {
    title: string;
    content: string;
    userId: string;
}

export const createNote = async ({ title, content, userId }: NotePayload) => {
    try {
        const response = await fetch(`${serverUrl}/api/notes`, {
            method: 'POST',
            body: JSON.stringify({ title, content, userId }),
            headers: {
                "content-type": "application/json",
            },
        })

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getNote = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/notes/650aca0984cea96311cee68c`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getPhotos = async () => {
    const API_BASE_PATH = 'https://script.google.com/macros/s/';
    const apiVerKey = 'AKfycbwqEWBMBuxVTTEWSzgekY1g08G1XD2fauTUlfkzAYsTcyQit2T1rM8L4FbpwEtrMi98oA';
    const serviceId = 'yvonne-dev-test'
    const res = await axios.get(`${API_BASE_PATH}${apiVerKey}/exec?api=display-record&serviceId=${serviceId}`);

    return res?.data?.data || [];
}
