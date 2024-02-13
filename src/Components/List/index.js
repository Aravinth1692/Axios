import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserDetails } from '../../Services/usingAxios';
import './list.css';
import Card from "@material-ui/core/Card";

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

    const getallUserDetails = async () => {
        const userData = await getUserDetails();
        setUsers(userData.data)
    };
    const editUser = async (val) => {
        seteditUsers('editVal')
        setcurrentUsers(val)
    }
    const submitdata = async (val, Data) => {
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

        }

    }
    const deleteUser = async(ID) => {
        const Deletedata = users.filter((val)=>val.id != ID)
        setUsers(Deletedata)
    }

    useEffect(() => {
        getallUserDetails();
    }, []);

    useEffect(() => {
        // console.log(users)
    }, [users]);

    return <div>

        <div className="user_container">
            <b>Total User : </b> {users.length}
            {users.map((item, index) =>
                <div className="user" key={index}>
                    <div className="display">
                        <div className="textAlign">
                            <div className="name"> <b>Name : </b></div>
                            <div className="name"> <b>User Name : </b></div>
                            <div className="name"> <b>Phone No. : </b> </div>
                            <div className="name"> <b>Email ID : </b></div>
                            <div className="name"> <b>Company Name : </b> </div>
                            <div className="website"><b>Website : </b> </div>
                        </div>
                        {editusers === 'editVal' && currentusers === item.id ?
                            <div className="txtjustify">
                                <div><input defaultValue={item.name} onChange={(event) => setnameUsers(event.target.value)} /></div>
                                <div><input defaultValue={item.username} onChange={(event) => setusername(event.target.value)} /></div>
                                <div><input defaultValue={item.phone} onChange={(event) => setphnumUsers(event.target.value)} /></div>
                                <div><input defaultValue={item.email} onChange={(event) => setcompanynameUsers(event.target.value)} /></div>
                                <div><input defaultValue={item.company.name} onChange={(event) => setmailidUsers(event.target.value)} /></div>
                                <div><input defaultValue={item.website} onChange={(event) => setwebsiteUsers(event.target.value)} /></div>
                            </div> :
                            <div className="txtjustify">
                                <div>{item.name}</div>
                                <div>{item.username}</div>
                                <div>{item.phone}</div>
                                <div>{item.email}</div>
                                <div>{item.company.name}</div>
                                <div>{item.website}</div>
                            </div>
                        }
                    </div>

                    {editusers === 'editVal' && currentusers === item.id ? <button className="marginrgt10" onClick={(event) => { submitdata(item.id, item) }}>
                        Submit
                    </button> : <button className="marginrgt10" onClick={(event) => { editUser(item.id) }}>
                        Edit
                    </button>}
                    <button onClick={(event) => { deleteUser(item.id) }}>
                        Delete
                    </button>
                </div>

            )}
        </div>
    </div>

};
export default ListPage;