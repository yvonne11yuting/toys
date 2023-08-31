import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        const API_PATH = 'https://script.google.com/macros/s/AKfycbwqEWBMBuxVTTEWSzgekY1g08G1XD2fauTUlfkzAYsTcyQit2T1rM8L4FbpwEtrMi98oA/exec'
        const api = 'display-record'
        const serviceId = 'yvonne-dev-test'
        const query = new URLSearchParams({ api, serviceId })
        const API_ENDPOINT = `${API_PATH}?${query.toString()}`

        const result = await axios.get(API_ENDPOINT)
        console.log('result--------------', result);
        return NextResponse.json(result.data.data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })

    }
}
