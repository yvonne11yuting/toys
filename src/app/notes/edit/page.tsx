import NoteEditor from "@/components/editor/NoteEditor";
import { getNote } from "@/lib/actions";

const Edit = async () => {
    const note = await getNote();

    return (
        <div className="mt-4">
            <NoteEditor content={note.content} />
        </div>
    );
}

export default Edit;
