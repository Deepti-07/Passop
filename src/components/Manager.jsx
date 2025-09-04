import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        setpasswordArray(passwords)
       
    }



    useEffect(() => {
        getpasswords()

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
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


    const showpassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "password"

        }
    }

    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if (form.id) {
                await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
                setpasswordArray([...passwordArray, { ...form, id:form.id }])
                console.log([...passwordArray, { ...form, id: uuidv4() }])
            /*}else{
                // If there is an existing id, update the password
                await fetch("http://localhost:3000/", { 
                    method: "PUT", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({...form, id:form.id }) 
                })*/
            } else {
                // If there is no id, add a new password
                await fetch("http://localhost:3000/", {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ ...form, id: uuidv4() })
                });
            }
           
            // Fetch the updated list of passwords
            getpasswords();
    
            toast('Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
    
            setform({ site: "", username: "", password: "" });
        } else {
            toast('Password not saved');
        }
    };


    const deletePassword = async (id) => {
        let c = confirm("do you really want to delete?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id })
            })
            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast('password deleted', {
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
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setform({ ...passwordToEdit, id: id });
    };




    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

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
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute  h-screen w-screen  transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(86,217,29,14%)_100%)]">

                <div className="container mx-auto  max-w-200 w-full my-4">

                    <h1 className='text-4xl text font-bold  text-center my-1'><span className='text-green-500 text-3xl'>&lt;</span>
                        Pass
                        <span className='text-green-500 text-3xl'>OP/&gt;</span></h1>
                    <p className='text-green-700 text-xl text-center'>Your Own Password Manager</p>

                    <div className='text-white flex flex-col p-4 items-center'>
                        <input value={form.site} onChange={handlechange} className='rounded-full border text-black border-green-800 bg-white py-1 p-4 w-full' type="text" name="site" placeholder='Enter Website URL' />

                        <div className="flex px-3 gap-3 my-5  items-center justify-center text-black w-full">
                            <input value={form.username} onChange={handlechange} className='rounded-full border text-black border-green-800 bg-white py-1 px-2 w-full' type="text" name="username" placeholder='Enter Username' />
                            <div className="relative">

                                <input ref={passwordRef} value={form.password} onChange={handlechange} className='rounded-full border text-black border-green-800 bg-white py-1 p-4 w-full' type="password" name="password" placeholder='Enter Password' />
                                <span className='absolute right-0 top-{1px} cursor-pointer' onClick={showpassword}><img ref={ref} className='p-1 my-0.5' width={30} src="icons/eye.png" alt="eye" /></span>
                            </div>
                        </div>

                        <button onClick={savepassword} className='flex justify-center text-black items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover" >
                            </lord-icon>
                            Save Password</button>

                    </div>
                    <div className="passwords">
                        <h2 className='text-green-900 font-bold py-3 text-2xl'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='flex items-center justify-center border border-white py-2  '><a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>

                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>


                                        </td>
                                        <td className='border border-white py-2 text-center'>
                                            <div className='flex items-center justify-center '><span>{"*".repeat(item.password.length)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='justify-center py-3 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>


                                })}

                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default Manager
