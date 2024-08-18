import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request, data: any) {
  try {
    console.log("test api request: ", request);
    const API_PATH =
      "https://script.google.com/macros/s/AKfycbzgNGUvD5mxHkUqyFTBOwi7gdejgLKOS-hEqGH6CnbjyDefay7fjGyeqNdzOtuj6tO5xw/exec";
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const tabName = params.get("tabName") || "";
    const sheetId = params.get("sheetId") || "";
    const query = new URLSearchParams(sheetId ? { tabName, sheetId } : { tabName });
    const API_ENDPOINT = `${API_PATH}?${query.toString()}`;
    console.log("tabName", tabName);
    console.log("API_ENDPOINT", API_ENDPOINT);

    const result = await axios.get(API_ENDPOINT);
    console.log("result--------------", result);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
