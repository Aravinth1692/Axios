import React,{ useState ,useEffect} from "react";
import  { getUserDetails } from '../../Services/usingAxios';
import './list.css';
import Card from "@material-ui/core/Card";

const ListPage=() => {
    const [ users,setUsers] = useState([]);
    const getallUserDetails= async() =>{
      const userData =  await getUserDetails();
      setUsers(userData.data)
    };
    useEffect(() => {
        getallUserDetails();
    },[]);

    useEffect(() => {
        console.log(users)
    },[users]);

    return <div>
       <div className="stickey">User Details</div> 
       <div>
       <form >
      <Card style={{ width: 950,height:40,padding:30,border:'none',boxShadow:'none',display:'flex',marginRight:20, marginLeft:15,borderRadius:14}}>
      <div style={{marginLeft:20}}>
    </div>
    </Card>
        </form>
       </div>
       
        <div className="user_container">  
        {users.length}
        {/* {users.map((item,index) => 
        <div className="user"key={index}>
            <div className="name"> {item.name} </div>
            <div className="website"> {item.website} </div>
            <button>
            Delete
        </button>
        </div>
        
        )} */}
        </div>
    </div>
    
};
export default ListPage;