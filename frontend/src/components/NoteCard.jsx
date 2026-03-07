import { PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes }) =>{ 
  const handleDelete =async(e,id)=>{
    e.preventDefault();

    if(!window.confirm("Are you sure want to delete ??")) return

try {
  axiosInstance.delete(`/${id}`)
  toast.success("successfully deleted!")

  setNotes((prev)=>prev.filter(note=>note._id !==id))
  
} catch (error) {
  console.log("failed to delete",error)
  toast.error("failed to delete")
  
}
  }
  
  
  return  (
  <Link to={`/note/${note._id}`}>
    <div className="w-64 border border-base-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-white p-4 flex flex-col justify-between">
      
      {/* Title */}
      <h2 className="text-md font-semibold mb-1 truncate">{note.title}</h2>
      
      {/* Content */}
      <p className="text-sm text-gray-500 line-clamp-3 mb-2">{note.content}</p>
      
      {/* Date */}
      <p className="text-xs text-gray-400 mb-2">{new Date(note.createdAt).toLocaleDateString()}</p>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-1 text-primary text-sm">
          <PenSquare size={14} /> Edit
        </span>
        <button
          className="btn btn-xs btn-error btn-outline"
          onClick={(e) =>handleDelete(e,note._id)}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  </Link>
)};

export default NoteCard;