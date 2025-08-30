import connectMongoDB from '@/lib/mongodb';
import Note from '@/models/notes';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { title, content } = await request.json();
    await connectMongoDB();
    await Note.findByIdAndUpdate(id, { title, content });
    return NextResponse.json({ message: 'Note Updated Successfully' }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectMongoDB();
    const note = await Note.findOne({ _id: id });

    if (!note) {
        return NextResponse.json({ message: 'Cannot find the note id' }, { status: 404 });
    }
    return NextResponse.json(note, { status: 200 });
}
