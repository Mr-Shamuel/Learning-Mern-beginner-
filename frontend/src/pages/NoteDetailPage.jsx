import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import axiosInstance from '../lib/axios';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

useEffect(()=>{

  const fetchNote=async()=>{
    try {
      const res =await axiosInstance.get(`/${id}`); 
      setNote(res.data);
      
    } catch (error) {
      console.log("failed to fetched",error);
      toast.error("failed to fetched");
    }finally{
      setLoading(false)
    }
  }
  fetchNote();

},[id])


if (loading) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>
  );
}


const handleSave = async () => {
  if (!note.title.trim() || !note.content.trim()) {
    toast.error("Please add a title or content");
    return;
  }

  setSaving(true);

  try {
    await axiosInstance.put(`/${id}`, note);
    toast.success("Note updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error saving the note:", error);
    toast.error("Failed to update note");
  } finally {
    setSaving(false);
  }
};


const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await axiosInstance.delete(`/${id}`);
    toast.success("Note deleted");
    navigate("/");
  } catch (error) {
    console.log("Error deleting the note:", error);
    toast.error("Failed to delete note");
  }
};



  return (
    <div className='main-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          


          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className='card-title text-2xl mb-4'>Create new Note</h2>

              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text"
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({...note,title:e.target.value})}
                />
              </div>


              <div className="form-control mb-4">
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({...note,content:e.target.value})}

                />
              </div>

              <div className="card-actions justify-end">
                <button onClick={handleSave}
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NoteDetailPage