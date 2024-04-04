import React, { useState } from 'react'
import "../Comments/Comments.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';


const Comments = ({cmt}) => {
    const [booleonLike,setBooleonLike] =useState(false)
    const [likeCount,setLikeCount] =useState(cmt.likes)

  return (
    <div className="overAllCommentList">
        <div className="commentList">
            <div className='commentList1'>
                <div className="commentHead">
                    {/* <div><img src={cmt.profilePic} /></div> */}
                    <p><span>{cmt.username}</span>{cmt.comment}</p>
                </div>

                
            </div>

        
    </div>
    </div>
    
  )
}

export default Comments