"use client"
import { Editor } from 'novel';
import { getLocalStorage } from '@/utils/storage';
import { createNote } from '@/lib/actions';

const NoteEditor = ({ content }: {
    content: string
}) => {
    return (
        <Editor
            defaultValue={JSON.parse(content)}
            onDebouncedUpdate={(e) => {
                const data = getLocalStorage('novel__content')
                if (data === null) return;
                createNote({ title: 'testnote', content: data, userId: 'testuser' })
            }}
        />
    )
}

export default NoteEditor