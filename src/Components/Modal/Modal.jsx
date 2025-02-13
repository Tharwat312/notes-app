import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { tokenContext } from '../../Context/TokenContext';
function Modal({ setShowModal, setNotes, updateValues, isUpdating, setIsUpdating }) {
    const { token } = useContext(tokenContext);
    const handleModal = () => {
        setShowModal(false);
    }
    const callAPI = async (values) => {
        if (!isUpdating) {
            try {
                const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, values,
                    {
                        headers: {
                            token: `3b8ny__${token}`
                        }
                    }
                )
                if (data.msg = "done") {
                    setShowModal(false);
                    setNotes(prevState => [...prevState, data.note])
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${updateValues._id}`, values, {
                    headers: {
                        token: `3b8ny__${token}`
                    }
                })
                console.log(data);
                if (data.msg === "done") {
                    setNotes(prevState => prevState.map(note => note._id === data.note._id ? data.note : note))
                    setShowModal(false);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsUpdating(false);
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            title: isUpdating ? updateValues.title : "",
            content: isUpdating ? updateValues.content : "",
        },
        onSubmit: callAPI,
    })
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <form onSubmit={formik.handleSubmit} className="border-0 shadow-lg relative flex flex-col w-full dark:bg-[#171717] rounded outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-white capitalize">
                                Add a new note!
                            </h3>
                            <button
                                type='submit'
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-3 flex items-center justify-center">
                            <label htmlFor="title" className='mr-3 text-white'>Title</label>
                            <input name="title" id="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></input>
                            <p className='text-center hidden text-red-500 my-5'>Error Message</p>
                        </div>
                        <div className="p-6 flex items-center justify-center">
                            <label htmlFor="content" className='mr-3 text-white'>Content</label>
                            <textarea name="content" id="content"
                                rows={5}
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                className='block resize-y w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></textarea>
                            <p className='text-center hidden text-red-500 my-5'>Error Message</p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleModal}
                            >
                                Close
                            </button>
                            <button
                                className="disabled:opacity-85 disabled:cursor-not-allowed bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                {isUpdating ? "Update Note" : "Add Note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default Modal