import connectMongoDB from "@/lib/mongodb";
import Note from "@/models/notes";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content, userId } = await request.json();
  await connectMongoDB();
  await Note.create({ title, content, userId });
  return NextResponse.json(
    { message: "Note Stored Successfully" },
    { status: 201 },
  );
}

export async function GET() {
  await connectMongoDB();
  const notes = await Note.find();
  return NextResponse.json({ notes }, { status: 200 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await connectMongoDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Note Deleted Successfully" },
    { status: 200 },
  );
}
