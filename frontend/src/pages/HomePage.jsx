import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard'
import axiosInstance from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get('/all')
        console.log(res.data)

        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log(error.response, 'err')

        if (error?.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("failed to load notes")
        }
      }
      finally {
        setLoading(false)
      }


    }
    fetchNotes();

  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {loading ? <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>
    : <>
       {isRateLimited && <RateLimitedUI />}
      <div className="flex justify-center items-center h-screen">
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {
          notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {
                notes.map(note => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))
              }
            </div>
          )
        }
      </div>
    </>
 }
   
    </div>
  )
}

export default HomePage