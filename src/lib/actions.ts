import { ProjectForm } from '@/common.types';
import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

export const getUser = (email: string) => {
    return
}


export const createUser = (name: string, email: string, avatarUrl: string) => {
    return
}

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

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    return
}

export const fetchAllProjects = async (category?: string, endcursor?: string) => {
    return
}

export const getProjectDetails = (id: string) => {
    return
}

export const getUserProjects = (id: string, last?: number) => {
    return
};

export const deleteProject = (id: string, token: string) => {
    return
};

export const getPhotos = async () => {
    const res = await axios.get(`${serverUrl}/api/photos`)
    return res.data;
}
