import "./NoteTable.css";
import React, { useEffect, useMemo, useState } from 'react'
import { noteTableInfo } from '../../helpers/tablesInfo'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { fetchData } from '../../helpers/fetchData';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { BsTrash3Fill } from 'react-icons/bs';
import NoteForm from "../formComponents/NoteForm";
import DeleteForm from "../formComponents/DeleteForm";
import { PiNoteLight } from "react-icons/pi";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { notify } from "../../helpers/notify";
import { toast } from "react-toastify";

function NoteTable({ setNoteModal, pedido, id_pedido }) {
    const { headerIcon, headerTitle, tableColumns } = noteTableInfo;
    const [form, setForm] = useState(false);
    const [mode, setMode] = useState("");
    const [notes, setNotes] = useState([]);
    const [deleteForm, setDeleteForm] = useState(false);

    const [isActive, setIsActive] = useState(() => {
        const initial = {};
        notes.forEach(note => {
            initial[note._id] = false;
        });
        return initial;
    });

    const totalActiveNotes = useMemo(() => {
        return Object.values(isActive).filter(value => value).length;
    }, [isActive]);

    const isAnyNoteActive = totalActiveNotes > 0;

    const activeNotes = Object.keys(isActive).filter(id => isActive[id]);

    const getNotes = () => {
        fetchData("notes", "", pedido, setNotes);
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            {form &&
                <NoteForm
                    setModal={setForm}
                    id_pedido={id_pedido}
                    notes={notes}
                    setNotes={setNotes}
                    mode={mode}
                    setMode={setMode}
                    activeNotes={activeNotes}
                />}
            {(deleteForm && isAnyNoteActive) &&
                <DeleteForm
                    setModal={setDeleteForm}
                    tableInfo={noteTableInfo}
                    id={id_pedido}
                    totalFilesToDelete={totalActiveNotes}
                    filesToDelete={activeNotes}
                    data={notes}
                    setData={setNotes}
                    isActive={isActive}
                    setIsActive={setIsActive}
                />
            }
            <div className="overlay"></div>
            <div className="formContainer noteTableContainer">
                <div className="formHeaderBackground">
                    <div className="formHeader">
                        {headerIcon}
                        <h1>{headerTitle} {pedido}</h1>
                        <button onClick={() => setNoteModal(false)}>
                            <IoMdCloseCircleOutline className="close" />
                        </button>
                    </div>
                </div>
                <div className="formBody">
                    <div className="actions">
                        <HiOutlinePlusCircle onClick={() => {
                            setForm(true)
                        }} />
                        <GrEdit onClick={() => {
                            if (totalActiveNotes === 1) {
                                setMode("edit")
                                setForm(true)
                            } else if (totalActiveNotes > 1) {
                                notify(toast.error, "error", "Solo se puede editar una nota a la vez", "")
                            }
                        }} />
                        <BsTrash3Fill onClick={() => {
                            isAnyNoteActive && setDeleteForm(true)
                        }} />
                    </div>
                    <div className="noteTable">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    {tableColumns.map((column) => (
                                        <th key={column.key}>{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(notes) && notes.map((note, index) => (
                                    <React.Fragment key={note._id}>
                                        <tr
                                            className={`${index % 2 === 0 ? "rowLight" : "rowDark"} ${isActive[note._id] ? "active" : ""}`}
                                            onClick={() =>
                                                setIsActive((prev) => ({
                                                    ...prev,
                                                    [note._id]: !prev[note._id]
                                                }))
                                            }
                                        >
                                            <td>
                                                {isActive[note._id] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                            </td>
                                            {tableColumns.map((column) => (
                                                <td key={column.key}>{note[column.key]}</td>
                                            ))}
                                        </tr>
                                        {isActive[note._id] && (
                                            <tr className="rowDetail">
                                                <td colSpan={5} className="noteContent">
                                                    <div className="noteContainer">
                                                        <p>{note.nota}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tableFooter"></div>
                </div>
            </div>
        </>
    )
}

export default NoteTable