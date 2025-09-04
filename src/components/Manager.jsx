import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';


const Manager = () => {
    const ref = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [showPasswords, setShowPasswords] = useState(false);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            document.getElementById('password').type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            document.getElementById('password').type = "password"
        }
    }

    const copyText = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            const existingPasswordIndex = passwordArray.findIndex(item => item.id === form.id);

            if (existingPasswordIndex !== -1) {
                await fetch(`http://localhost:3000/`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
            } else {
                await fetch(`http://localhost:3000/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            }

            setForm({ site: "", username: "", password: "" })
            getPasswords()
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Please fill all fields with at least 4 characters.');
        }
    }


    const deletePassword = async (id) => {
        const isConfirmed = window.confirm("Do you really want to delete this password?");
        if (isConfirmed) {
            await fetch(`http://localhost:3000/`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
            getPasswords();
            toast('🦄 Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(i => i.id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
            setShowPasswords(false);
        }
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <div className="p-2 md:p-4 min-h-[85vh] flex flex-col justify-center items-center">
                {showPasswords ? (
                    <div className="container mx-auto max-w-6xl w-full">
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={() => { setShowPasswords(false) }} className='text-white bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center gap-2 py-2 px-4 transition-all duration-300 ease-in-out transform hover:scale-105 ring-1 ring-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                <span>Back</span>
                            </button>
                            <h2 className='text-white text-center text-2xl font-bold'>Your Passwords</h2>
                            <div className='w-24'></div> {/* Spacer to keep title centered */}
                        </div>

                        {passwordArray.length === 0 && <div className='text-white text-center py-10'> No passwords to show</div>}
                        {passwordArray.length !== 0 && (
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-300">
                                    <thead className="text-xs text-white uppercase bg-indigo-500/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Site
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Username
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Password
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passwordArray.map((item) => {
                                            return <tr key={item.id} className="bg-slate-900/60 border-b border-slate-800 hover:bg-slate-800/80">
                                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                    <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.username}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.password}
                                                </td>
                                                <td className="px-6 py-4 flex items-center gap-4">
                                                    <button onClick={() => { editPassword(item.id) }} className="font-medium text-indigo-400 hover:underline">Edit</button>
                                                    <button onClick={() => { deletePassword(item.id) }} className="font-medium text-red-400 hover:underline">Delete</button>
                                                    <button onClick={() => { copyText(item.password) }} className="font-medium text-green-400 hover:underline">Copy</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-5xl m-auto w-full">
                        <h1 className='text-4xl font-bold text-center text-white'>
                            <span className='text-indigo-400'>&lt;</span>
                            <span>Pass</span><span className='text-indigo-400'>OP/&gt;</span>
                        </h1>
                        <p className='text-indigo-300/80 text-lg text-center'>Your Trusted Password Manager</p>

                        <div className='flex flex-col p-12 text-black gap-8 items-center bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-lg mt-8'>
                            <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-indigo-500 w-full p-4 py-1 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" name='site' id='site' />
                            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                                <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-indigo-500 w-full p-4 py-1 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" name='username' id='username' />
                                <div className="relative w-full">
                                    <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-indigo-500 w-full p-4 py-1 pr-12 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500' type="password" name='password' id='password' />
                                    <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer' onClick={showPassword}>
                                        <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                                    </span>
                                </div>
                            </div>

                            <div className='flex justify-center items-center gap-2'>
                                <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-full px-8 py-2 w-fit ring-1 ring-white transition-all duration-300 ease-in-out transform hover:scale-105 text-white font-semibold'>
                                    Save
                                </button>
                                <button onClick={() => setShowPasswords(true)} className='flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-full px-8 py-2 w-fit ring-1 ring-white transition-all duration-300 ease-in-out transform hover:scale-105 text-white font-semibold'>
                                    Show Passwords
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Manager

