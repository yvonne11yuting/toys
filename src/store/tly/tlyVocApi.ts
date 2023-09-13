import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Vocabulary } from "./type";

interface ApiResponse {
    code: number;
    data: Vocabulary[],
    message: string;
}

export const tlyVocApi = createApi({
    reducerPath: "vocabulariesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://script.google.com/macros/s/AKfycbyFnfw1apOYyP2LgT4NZdM2-btZD8uj9DeCGhaM7PUJdSfzunchBUQuzrcSVIQENcdPXg/exec'
    }),

    endpoints: (builder) => ({
        getVocabularies: builder.query<object, string>({
            query: (sheetId) => {
                const url = new URLSearchParams({ sheetId }).toString();

                return { url: `?${url}` };
            },
            transformResponse: (response: ApiResponse) => {
                return response.data.filter((item: Vocabulary) => !!item.question && !!item.answer);
            },
        }),
    }),
});

export const { useGetVocabulariesQuery } = tlyVocApi;