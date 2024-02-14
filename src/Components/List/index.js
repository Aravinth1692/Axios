import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails ,addUserDetails} from '../../Services/usingAxios';
import './list.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListPage = () => {
    const [users, setUsers] = useState([]);
    const [editusers, seteditUsers] = useState([]);
    const [currentusers, setcurrentUsers] = useState([]);
    const [nameusers, setnameUsers] = useState([]);
    const [phnumusers, setphnumUsers] = useState([]);
    const [username, setusername] = useState([]);
    const [companynameusers, setcompanynameUsers] = useState([]);
    const [mailidusers, setmailidUsers] = useState([]);
    const [websiteusers, setwebsiteUsers] = useState([]);
    const [newusersEnable, setnewusersEnable] = useState([]);

    const getallUserDetails = async () => {
        const userData = await getUserDetails();
        setUsers(userData.data)
    };
    const editUser = async (val,item) => {
        seteditUsers('editVal')
        setcurrentUsers(val)
        setnameUsers(item.name)
        setphnumUsers(item.phone)
        setusername(item.username)
        setcompanynameUsers(item.company.name)
        setmailidUsers(item.email)
        setwebsiteUsers(item.website)
        setnewusersEnable(false)
    }
    const deleteNewUser = async()=>{
        setnewusersEnable(false)
        setnameUsers('')
        setphnumUsers('')
        setusername('')
        setcompanynameUsers('')
        setmailidUsers('')
        setwebsiteUsers('')
        seteditUsers('')
    }
    const notify = () => toast.error("Please Fill All Details");
    const Successnotify = () => toast.success("Update Successfully");
    const submitdata = async (val, Data) => {
        if (nameusers === "" || username === "" || mailidusers === "" ||
            phnumusers === "" || websiteusers === "" || companynameusers === "")  {
            notify();
            return;
        }
        const payload = {
            id: val,
            name: nameusers.length === 0 ? Data.name : nameusers,
            username: username.length === 0 ? Data.username : username,
            email: mailidusers.length === 0 ? Data.email : mailidusers,
            phone: phnumusers.length === 0 ? Data.phone : phnumusers,
            website: websiteusers.length === 0 ? Data.website : websiteusers,
            company: {
                name: companynameusers.length === 0 ? Data.company.name : companynameusers
            }
        }
        const response = await updateUserDetails(val, payload)
        if (response.status === 200) {
        const updatedList = users.map(item => {
        if (item.id === val) {
        return {
        ...item, name: nameusers.length === 0 ? Data.name : nameusers,
        username: username.length === 0 ? Data.username : username,
        email: mailidusers.length === 0 ? Data.email : mailidusers, phone: phnumusers.length === 0 ? Data.phone : phnumusers,
        website: websiteusers.length === 0 ? Data.website : websiteusers, company: {
        name: companynameusers.length === 0 ? Data.company.name : companynameusers
        }
                    };
        }
                return item;
        });
        seteditUsers('')
        setUsers(updatedList)
        Successnotify()
        }

    }
    const AddUser = async () => {
        setnewusersEnable(true)
    }
        const createUser = async () => {
        if ((nameusers === "" || username === "" || mailidusers === "" ||
            phnumusers === "" || websiteusers === "" || companynameusers === "") ||
            (nameusers.length === 0 || username.length === 0 || mailidusers.length === 0 ||
            phnumusers.length === 0 || websiteusers.length === 0 || companynameusers.length === 0)) {
            notify();
            return;
        }
        const ResData = await addUserDetails();
        let newArray = [{
            "id": ResData.data.id,
            "name": nameusers,
            "username": username,
            "email": mailidusers,
            "address": {
              "street": "",
              "suite": "",
              "city": "",
              "zipcode": "",
              "geo": {
                "lat": "",
                "lng": ""
              }
            },
            "phone": phnumusers,
            "website": websiteusers,
            "company": {
              "name": companynameusers,
              "catchPhrase": "",
              "bs": ""
            }
          }]
            const updatedList = [...users,...newArray]
            setnewusersEnable(false)
            seteditUsers('')
            setUsers(updatedList)
            Successnotify()
    }

    const deleteUser = async (ID) => {
        const Deletedata = users.filter((val) => val.id !== ID)
        setUsers(Deletedata)
    }

    useEffect(() => {
        getallUserDetails();
    }, []);

    useEffect(() => {
        // console.log(users)
    }, [users]);

    return <div>
        <ToastContainer />
        <div className="user_container cardWidth">
            <b>Total Users : </b> {users.length}
            <button className="brnStyle createClr" title="Create" onClick={(event) => { AddUser() }}>
                        Create
                    </button>
                    {/* create New User */}
                    { newusersEnable === true && 
                    <div className="user" >
                    <div className="display">
                        <div className="textAlign display">

                            <div style={{ marginRight: '10px' }}>
                                {/* name */}
                                <div className="name display padding10"> <b className="marginRight">Name : </b>
                                    <div><input onChange={(event) => setnameUsers(event.target.value)} /></div>
                                </div>
                                {/* Username */}
                                <div className="name display padding10"> <b className="marginRight">User Name : </b>
                                    <div><input onChange={(event) => setusername(event.target.value)}  /></div>
                                </div>
                                {/* phone number */}
                                <div className="name display padding10"> <b className="marginRight">Phone No. : </b>
                                    <div><input onChange={(event) => setphnumUsers(event.target.value)}  /></div>
                                </div>
                            </div>
                            <div>
                                {/* mail id */}
                                <div className="name display padding10"> <b className="marginRight">Email ID : </b>
                                    <div><input onChange={(event) => setcompanynameUsers(event.target.value)} /></div>
                                </div>
                                {/* Company name */}
                                <div className="name display padding10"> <b className="marginRight">Company Name : </b>
                                    <div><input onChange={(event) => setmailidUsers(event.target.value)}   /></div>
                                </div>
                                {/* website */}
                                <div className="website display padding10"><b className="marginRight">Website : </b>
                                    <div><input  onChange={(event) => setwebsiteUsers(event.target.value)}  /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="brnStyle marginrgt10 createBtnCLr" onClick={(event) => { createUser() }}>
                        Create
                    </button>
                    <button className="brnStyle deleteClr" onClick={(event) => { deleteNewUser() }}>
                        Delete
                    </button>

                </div>
                }

                {/* Exiting user */}
            {users.map((item, index) =>
                <div className="user" key={index}>
                    <div className="display">
                        <div className="textAlign display">

                            <div style={{ marginRight: '10px' }}>
                                {/* name */}
                                <div className="name display padding10"> <b className="marginRight">Name : </b>

                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.name} onChange={(event) => setnameUsers(event.target.value)} /></div> :
                                        <div>{item.name}</div>}

                                </div>
                                {/* Username */}
                                <div className="name display padding10"> <b className="marginRight">User Name : </b>

                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.username} onChange={(event) => setusername(event.target.value)} /></div> : <div>{item.username}</div>}

                                </div>
                                {/* phone number */}
                                <div className="name display padding10"> <b className="marginRight">Phone No. : </b>


                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.phone} onChange={(event) => setphnumUsers(event.target.value)} /></div> : <div className="txtWrap">{item.phone}</div>}

                                </div>
                            </div>

                            <div>
                                {/* mail id */}
                                <div className="name display padding10"> <b className="marginRight">Email ID : </b>


                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.email} onChange={(event) => setcompanynameUsers(event.target.value)} /></div> : <div className="txtWrap">{item.email}</div>}

                                </div>
                                {/* Company name */}
                                <div className="name display padding10"> <b className="marginRight">Company Name : </b>


                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.company.name} onChange={(event) => setmailidUsers(event.target.value)} /></div> : <div>{item.company.name}</div>}

                                </div>
                                {/* website */}
                                <div className="website display padding10"><b className="marginRight">Website : </b>


                                    {editusers === 'editVal' && currentusers === item.id ? <div><input defaultValue={item.website} onChange={(event) => setwebsiteUsers(event.target.value)} /></div> : <div>{item.website}</div>}

                                </div>
                            </div>

                        </div>

                    </div>

                    {editusers === 'editVal' && currentusers === item.id ?
                        <button className="marginrgt10 brnStyle submitClr" onClick={(event) => { submitdata(item.id, item) }}>
                            Submit
                        </button> : <button className="marginrgt10 brnStyle editClr" onClick={(event) => { editUser(item.id,item) }}>
                            Edit
                        </button>}
                    <button className="brnStyle deleteClr" onClick={(event) => { deleteUser(item.id) }}>
                        Delete
                    </button>
                </div>

            )}
        </div>

    </div>

};
export default ListPage;