import React,{useEffect,useState} from 'react'
import "../Home/Post.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

import {PiSmileySad} from "react-icons/pi"
import {IoVolumeMuteOutline} from "react-icons/io5"
import {MdBlockFlipped} from "react-icons/md"
import {AiOutlineDelete} from "react-icons/ai"
import {MdReportGmailerrorred} from "react-icons/md"
import { getAllPosts } from '../../api/postService';

import {LiaFacebookF} from "react-icons/lia"
import {FiInstagram} from "react-icons/fi"
import {BiLogoLinkedin} from "react-icons/bi"
import {AiFillYoutube} from "react-icons/ai"
import {RxTwitterLogo} from "react-icons/rx"
import {FiGithub} from "react-icons/fi"

import img1 from "../../assets/Following/img-2.jpg"
import img2 from  "../../assets/Following/img-3.jpg"
import img3 from  "../../assets/Following/img-4.jpg"

import Profile from "../../assets/profile.jpg"
import Comments from '../Comments/Comments';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = ({post,setPosts,setFriendsProfile,images, posts}) => {
  console.log({posts})

  const [users,setUsers] = useState([]);
  const [comments,setComments] =useState([]);

  const extractComments = (posts) => {
    const extractedComments = [];
    posts.forEach(post => {
      if (post.comments && post.comments.length > 0) {
        post.comments.forEach(comment => {
          extractedComments.push(comment);
        });
      }
    });
    setComments(extractedComments);
    return extractedComments;
  };

  useEffect(() => {
    const extractedComments = extractComments(posts);
    setComments(extractedComments);
  }, [posts]);
    // const extractedComments = posts.reduce((acc, post) => {
    //         return acc.concat(post.comments.map(comment => {
    //             return {
    //                 //id: comment.commentAuthors[0].author, // You can set a unique id for each comment based on author or use any other unique identifier
    //                 //profilePic: 'profilePicURL', // Replace 'profilePicURL' with the actual URL of the profile picture
    //                 //likes: post.postLikeCount, // Assuming likes for each comment are the same as the post likes
    //                 username: comment.commentAuthors[0].author, // Assuming username is the same as the comment author
    //                 //time: 'Now', // You can set the time as per your requirement
    //                 comment: comment.commentAuthors[0].commentDesc // Assuming only one comment description per comment
    //             };
    //         }));
    //     }, []);
    //     setComments(extractedComments)


  const [like,setLike] =useState(post.like)
  const [unlike,setUnlike] =useState(false)

  const [filledLike,setFilledLike] =useState(<FavoriteBorderOutlinedIcon />)
  const [unFilledLike,setUnFilledLike] =useState(false)

  const handlelikes=()=>{
    setLike(unlike ? like -1 :like +1)
    setUnlike(!unlike)

    setFilledLike(unFilledLike ?   <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />)
    setUnFilledLike(!unFilledLike)
  }
 

  const [showDelete,setShowDelete] = useState(false)
  const [showComment,setShowComment] = useState(false)

const handleDelete=(id)=>{
  const deleteFilter =posts.filter(val=> val.id !== id)
    setPosts(deleteFilter)
    setShowDelete(false)
  }
 
  const [commentInput,setCommentInput] =useState("")

  const handleCommentInput=(e)=>{
     e.preventDefault()

    const id=comments.length ? comments[comments.length -1].id +1 : 1
    const profilePic =Profile
    const username="Vijay"
    const comment =commentInput
    const time= moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()

    const commentObj ={
      id:id,
      profilePic:profilePic,
      likes:0,
      username:username,
      comment:comment,
      time:time
    }
    const insert =[...comments,commentObj]
    setComments(insert)
    setCommentInput("")
  }
   const handleFriendsId=(id)=>{
      const friendsIdFilter = posts.filter(val => val.id === id)
      setFriendsProfile(friendsIdFilter)
   }
   const [socialIcons,setSocialIcons] = useState(false)
  return (
    <div>
        <div className='post' key={post.id}>
          <div className='post-header'>
            <Link to="/FriendsId" style={{ textDecoration: "none" }}>
              <div className='post-user' onClick={() => handleFriendsId(post.id)} style={{ cursor: "pointer" }}>
                {/* <img src={post.profilepicture} className='p-img' alt="" /> */}
                <h2>{post.Author}</h2>
              </div>
            </Link>
            {/* <div className='delete'>
              {showDelete && (
                <div className="options">
                  <button><PiSmileySad />Not Interested in this post</button>
                  <button><IoVolumeMuteOutline />Mute this user</button>
                  <button><MdBlockFlipped />Block this user</button>
                  <button onClick={() => handleDelete(post.id)}><AiOutlineDelete />Delete</button>
                  <button><MdReportGmailerrorred />Report post</button>
                </div>
              )}
              <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)} />
            </div> */}
          </div>
          <p className='body'>{post.postDesc.length <= 300 ? post.postDesc : `${post.postDesc.slice(0, 300)}...`}</p> 
          {/* {post.img && <img src={post.img} alt="" className="post-img" />} */}
          <div className="post-foot">
            <div className="post-footer">
              <div className="like-icons">
                <p className='heart' onClick={handlelikes} style={{ marginTop: "5px" }}>{filledLike}</p>
                <MessageRoundedIcon onClick={() => setShowComment(!showComment)} className='msg' />
                <ShareOutlinedIcon onClick={() => setSocialIcons(!socialIcons)} className='share' />
              </div>
              <div className="like-comment-details">
                <span className='post-like'>{post.postLikeCount} people like it,</span>
                <span className='post-comment'>{post.comments[0].commentCount} comments</span>
              </div>
              {showComment && (
                <div className="commentSection">
                  <form onSubmit={handleCommentInput}>
                    <div className="cmtGroup">
                      <SentimentSatisfiedRoundedIcon className='emoji' />
                      <input
                        type="text"
                        id="commentInput"
                        required
                        placeholder='Add a comment...'
                        onChange={(e) => setCommentInput(e.target.value)}
                        value={commentInput}
                      />
                      <button type='submit'><SendRoundedIcon className='send' /></button>
                    </div>
                  </form>
                  <div className="sticky">
                      <Comments className="classComment" cmt={post.comments} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post