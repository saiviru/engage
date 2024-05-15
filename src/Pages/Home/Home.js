import {  useState, useEffect } from 'react'
import Profile from "../../assets/profile.jpg"

import { getAllPosts } from '../../api/postService'
import "../Home/Home.css"

import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import moment from 'moment/moment'

const Home = ({setFriendsProfile}) => {
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPosts();
        console.log("respost:", response.data);
        if (response.data.length>0) {
          setPosts(response.data)
          console.log("from pro:",response.data)
          // dispatch(loginSuccess());
          // dispatch(addUser(response.data));
          // navigate("/home");
        } else {
          // dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
    const [posts,setPosts] = useState([])

      const [body,setBody] =useState("")
      const [importFile,setImportFile] =useState("")
      

      const handleSubmit =(e)=>{
        e.preventDefault()
        
        
        const id =posts.length ? posts[posts.length -1].id +1 :1
        const username="Vijay"
        const profilepicture=Profile
        const datetime=moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
        const img =images ? {img:URL.createObjectURL(images)} : null
        
        const obj ={id:id,
                   profilepicture:profilepicture,
                   username:username,
                   datetime:datetime,
                   img:img && (img.img),
                   body:body,
                   like:0,
                   comment:0
                  }

        

        const insert =[...posts,obj]
        setPosts(insert)
        setBody("")
        setImages(null)

      }
   
   const [search,setSearch] =useState("")

    
  const [following,setFollowing] =useState("")
        
  const [showMenu,setShowMenu] =useState(false)
  const [images,setImages] =  useState(null)

  return (
    <div className='interface'>
        <Nav 
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />

    <div className="home">
   
        <Left />

        <Middle 
        handleSubmit={handleSubmit}
        body ={body}
        setBody ={setBody}
        importFile ={importFile}
        setImportFile ={setImportFile}
        posts={posts}
        setPosts={setPosts}
        search={search}
        setFriendsProfile={setFriendsProfile}
        images={images}
        setImages={setImages}

        />

        <Right
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        following={following}
        setFollowing={setFollowing}
        />
    </div>

    </div>
  )
}

export default Home