'use client';
// import { Editor } from "novel"; // 暂时禁用 novel 编辑器
import { getLocalStorage } from '@/utils/storage';
import { createNote } from '@/lib/actions';
import { useState } from 'react';

const NoteEditor = () => {
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (content.trim()) {
            createNote({ title: 'testnote', content, userId: 'testuser' });
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                    标题
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="输入笔记标题"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                    内容
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="输入笔记内容..."
                    rows={10}
                    className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={handleSave}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                保存笔记
            </button>

            <div className="text-sm text-gray-500">
                <p>注意：novel 富文本编辑器暂时禁用，使用简单文本编辑器替代</p>
            </div>
        </div>
    );
};

export default NoteEditor;
