import React, { useState } from 'react'
import "../InfoProfile/Info.css"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import Info3 from "../../../../assets/Info-Dp/img-3.jpg"
import { updateProfile, update } from '../../../../api/userService';
import { addUser } from '../../../../Store/reducers/loginReducer';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';


import {LiaEdit} from "react-icons/lia"

import {IoCameraOutline} from "react-icons/io5"
import {BiLogOut} from "react-icons/bi"
import { useRef } from 'react';
import ModelProfile from '../ModelProfile/ModelProfile';
import { Link } from 'react-router-dom';

const Info = ({userPostData,
              following,
              modelDetails,
              setModelDetails,
              profileImg,
              setProfileImg,
              name,
              setName,
              userName,
              setUserName}) => {

                const userData = useSelector((state) => state?.login?.users);
console.log({userPostData})
  const [coverImg,setCoverImg] =useState(Info3)

  const importProfile=useRef()
  const importCover =useRef()

  let dispatch = useDispatch();


  
  const handleFile1=(e)=>{
    
    if(e.target.files && e.target.files[0]){
      let img =e.target.files[0];
      const formData = new FormData();
      formData.append('my_file', img);
      formData.append('email', userData.email);
      console.log({userData});
      const fetchData = async () => {
        try {
          // const response = await update(formData);
          const response = await axios.put(
            "http://localhost:5000/api/updateProfileImages",
            formData
          );
          console.log("res in profile info:",response.data);
          dispatch(addUser(response.data.data))
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
      const imgObj= {image:URL.createObjectURL(img)}
      const profileImg= imgObj.image
      setProfileImg(profileImg)
    }
  }

  const handleFile2 =(e)=>{
    if(e.target.files && e.target.files[0]){
      let img =e.target.files[0]
      const formData = new FormData();
      formData.append('my_file', img);
      formData.append('email', userData.email);
      console.log({userData});
      const fetchData = async () => {
        try {
          // const response = await update(formData);
          const response = await axios.put(
            "http://localhost:5000/api/coverImage",
            formData
          );
          console.log("res in profile info:",response.data)
          dispatch(addUser(response.data.data))
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
      const imgObj ={image:URL.createObjectURL(img)}
      const coverImg =imgObj.image
      setCoverImg(coverImg)
    }
  }

  const [openEdit,setOpenEdit] =useState(false)

  const [countryName,setCountryName]= useState("")
  const [jobName,setJobName]= useState("")
  
  const handleModel=(e)=>{
    e.preventDefault()

    const ModelName =name
    const ModelUserName=userName
    const ModelCountryName=countryName
    const ModelJobName = jobName

    let obj={
          ModelName:ModelName,
          ModelUserName:ModelUserName,
          ModelCountryName:ModelCountryName,
          ModelJobName:ModelJobName,
    }

    setModelDetails(obj)
    setOpenEdit(false)
  }

  function formatDate(dateString) {
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[1], 10);
  const month = parseInt(dateParts[0], 10);
  const year = parseInt(dateParts[2], 10);
  
  const formattedDate = new Date(year, month - 1, day);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedString = formattedDate.toLocaleDateString('en-GB', options);
  
  return formattedString.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
}

function filterPostsByAuthor(posts, author) {
  return posts.filter(post => post.Author === author);
}


  return (


    <div className='info'>
        <div className="info-cover">
            <img src={userData.ProfileImage1 || coverImg} alt="" />
            <img src={userData.ProfileImage} alt="" />
            <div className='coverDiv'><IoCameraOutline className='coverSvg' onClick={()=>importCover.current.click()}/></div>
            <div className='profileDiv'><IoCameraOutline className='profileSvg' onClick={()=>importProfile.current.click()}/></div>
        </div>
      

        
        <input type="file" 
        ref={importProfile}
        onChange={handleFile1}
        style={{display:"none"}}
        />
        
        <input type="file" 
        ref={importCover}
        onChange={handleFile2}
        style={{display:"none"}}
        />
        



        <div className="info-follow">
            <h1>{modelDetails.ModelName}</h1>
            <p>{modelDetails.ModelUserName}</p>

            <Link to="/" className='logout'>
              <BiLogOut />Logout
            </Link>

            {/* <button onClick={()=>setOpenEdit(true)}><LiaEdit />Edit Profile</button> */}
            <ModelProfile 
            name={name}
            setName={setName}
            userName={userName}
            setUserName={setUserName}
            countryName={countryName}
            setCountryName={setCountryName}
            jobName={jobName}
            setJobName={setJobName}
            handleModel={handleModel}
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            />
          

          <div className="info-details">
            <div className="info-col-1">
              <div className="info-details-list">
                <LocationOnOutlinedIcon />
                <span>{modelDetails.ModelCountryName}</span>
              </div>

              <div className="info-details-list">
                <WorkOutlineRoundedIcon />
                <span>{modelDetails.ModelJobName}</span>
              </div>

              <div className="info-details-list">
                <CalendarMonthRoundedIcon />
                <span>Joined on {formatDate(userData.joiningDate)}</span>
              </div>
            </div>

            <div className="info-col-2">
              <div>
                <h2>{filterPostsByAuthor(userPostData,userData.empId).length}</h2>
                <span>Posts</span>
              </div>
            </div>

          </div>


        </div>
    </div>
  )
}

export default Info