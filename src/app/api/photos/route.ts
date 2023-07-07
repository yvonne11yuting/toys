import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        const API_PATH = 'https://graph.instagram.com/me/media'
        const FIELDS = 'id,media_url,permalink'
        const LIMIT = 20
        const ACCESS_TOKEN = process.env.INSTAGRAM_TOKEN
        const API_ENDPOINT = `${API_PATH}?fields=${FIELDS}&limit=${LIMIT}&access_token=${ACCESS_TOKEN}`

        const result = await axios.get(API_ENDPOINT)
        console.log('result--------------', result);
        return NextResponse.json(result.data.data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })

    }
}
