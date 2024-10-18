import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, LESSON } from '../../api/endpoints';
import getCookie from '../../utils/getCookie';
import convertToFormData from '../../utils/convertToFormData';

export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + LESSON,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllNotes: builder.query({
            query: (id) => `/${id}/notes`,
            providesTags: [{ type: 'lesson', id: 'LIST' }],
        }),

        addNote: builder.mutation({
            query: (note) => ({
                url: `/${note.lesson_id}/notes`,
                method: 'POST',
                body: convertToFormData(note)
            }),
            invalidatesTags: [{ type: 'lesson', id: 'LIST' }],

        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'lesson', id: 'LIST' }],


        }),
        updateNote: builder.mutation({
            query: (note) => ({
                url: `/notes/${note.note_id}`,
                method: 'PATCH',
                body: convertToFormData({ title: note.title, content: note.content })
            }),
            invalidatesTags: [{ type: 'lesson', id: 'LIST' }],

        }),
    }),
});

export const { useGetAllNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = lessonApi;
