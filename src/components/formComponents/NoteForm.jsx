import GeneralForm from "./GeneralForm";
import { noteFormData } from "../../helpers/formsData";
import { useSession } from "../../context/SessionContext";

function NoteForm({ setModal, id_pedido, setNotes, mode, setMode, notes, activeNotes }) {
    const { session } = useSession();
    const pedidoDesglose = id_pedido.split("-");
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const fecha = today.toLocaleDateString().replaceAll("/", "-");
    const fullNote = notes.filter(note => note._id === activeNotes[0])[0];

    let noteData = {
        username: session.username,
        id_pedido,
        pedido: pedidoDesglose[0],
        version: pedidoDesglose[1],
        fecha,
        nota: (fullNote && mode === "edit") ? fullNote.nota : ""
    }

    return (
        <GeneralForm
            setModal={setModal}
            formData={noteFormData}
            itemsData={noteData}
            endpoint={"notes"}
            setTableData={setNotes}
            setTotal={""}
            mode={mode}
            setMode={setMode}
            _id={activeNotes[0]}
        />
    )
}

export default NoteForm