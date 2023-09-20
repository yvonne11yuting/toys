"use client"
import { Editor } from 'novel';

const NoteEditor = () => {
    return (
        <Editor onDebouncedUpdate={(e) => {
            const data = e || null
            console.log('e:', data)
        }} />
    )
}

export default NoteEditor