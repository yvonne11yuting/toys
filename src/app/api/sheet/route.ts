import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    console.log("test api request: ", request);
    const API_PATH =
      "https://script.google.com/macros/s/AKfycbwscEWJN2F2FhB16dXxg03JGzKofr-ny7WYghgLKnebEbHn-TYn56P4qgKE0ANSpwwO-A/exec";
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const tabName = params.get("tabName") || "";
    // const sheetId = params.get("sheetId") || "";
    const lastCell = params.get("lastCell") || "";
    const finalSearch = tabName
      ? ((tabName: string, lastCell: string) => {
          if (tabName && lastCell) {
            return { tabName, lastCell };
          } else {
            return { tabName };
          }
        })(tabName, lastCell)
      : {};
    const query = new URLSearchParams(finalSearch);
    const API_ENDPOINT = `${API_PATH}?${query.toString()}`;
    console.log("query", query);
    console.log("requesturl", request.url);
    console.log("lastCell: ---", lastCell);
    console.log("tabName", tabName);
    console.log("API_ENDPOINT", API_ENDPOINT);

    const result = await axios.get(API_ENDPOINT);
    console.log("result--------------", result);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
