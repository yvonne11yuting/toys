"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const chunkSize = 10 * 1024;

function UploadFiles() {

    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState<number | null>(null);

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        // @ts-ignore
        setFiles([...files, ...e.dataTransfer.files]);
    }

    function readAndUploadCurrentChunk() {
        const reader = new FileReader();
        // @ts-ignore
        const file = files[currentFileIndex];
        if (!file) {
            return;
        }
        // @ts-ignore
        const from = currentChunkIndex * chunkSize;
        const to = from + chunkSize;
        const blob = file.slice(from, to);
        reader.onload = e => uploadChunk(e);
        reader.readAsDataURL(blob);
    }
    // @ts-ignore
    function uploadChunk(readerEvent) {
        // @ts-ignore
        const file = files[currentFileIndex];
        const data = readerEvent.target.result;
        const params = new URLSearchParams();
        params.set('name', file.name);
        params.set('size', file.size);
        // @ts-ignore
        params.set('currentChunkIndex', currentChunkIndex);
        // @ts-ignore
        params.set('totalChunks', Math.ceil(file.size / chunkSize));
        const headers = { 'Content-Type': 'application/octet-stream' };
        const url = '/uploadToDrive?' + params.toString();
        axios.post(url, data, { headers })
            .then(response => {
                // @ts-ignore
                const file = files[currentFileIndex];
                // @ts-ignore
                const filesize = files[currentFileIndex].size;
                const chunks = Math.ceil(filesize / chunkSize) - 1;
                const isLastChunk = currentChunkIndex === chunks;
                if (isLastChunk) {
                    file.finalFilename = response.data.finalFilename;
                    // @ts-ignore
                    setLastUploadedFileIndex(currentFileIndex);
                    setCurrentChunkIndex(null);
                } else {
                    // @ts-ignore
                    setCurrentChunkIndex(currentChunkIndex + 1);
                }
            });
    }

    useEffect(() => {
        if (lastUploadedFileIndex === null) {
            return;
        }
        const isLastFile = lastUploadedFileIndex === files.length - 1;
        // @ts-ignore
        const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
        setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

    useEffect(() => {
        if (files.length > 0) {
            if (currentFileIndex === null) {
                setCurrentFileIndex(
                    lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
                );
            }
        }
    }, [files.length]);

    useEffect(() => {
        if (currentFileIndex !== null) {
            setCurrentChunkIndex(0);
        }
    }, [currentFileIndex]);

    useEffect(() => {
        if (currentChunkIndex !== null) {
            readAndUploadCurrentChunk();
        }
    }, [currentChunkIndex]);

    return (
        <div>
            <div
                onDragOver={e => { setDropzoneActive(true); e.preventDefault(); }}
                onDragLeave={e => { setDropzoneActive(false); e.preventDefault(); }}
                onDrop={e => handleDrop(e)}
                className={"dropzone" + (dropzoneActive ? " active" : "")}>
                Drop your files here
            </div>
            <div className="files">
                {files.map((file, fileIndex) => {
                    let progress = 0;
                    // @ts-ignore
                    if (file.finalFilename) {
                        progress = 100;
                    } else {
                        const uploading = fileIndex === currentFileIndex;
                        // @ts-ignore
                        const chunks = Math.ceil(file.size / chunkSize);
                        if (uploading && typeof currentChunkIndex === 'number') {
                            progress = Math.round(currentChunkIndex / chunks * 100);
                        } else {
                            progress = 0;
                        }
                    }

                    return (
                        <a key={fileIndex} className="file" target="_blank"
                            href={'http://localhost:4000/uploads/' + file.finalFilename} rel="noreferrer">
                            <div className="name">{file.name}</div>
                            <div className={"progress " + (progress === 100 ? 'done' : '')}
                                style={{ width: progress + '%' }}>{progress}%</div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default UploadFiles;