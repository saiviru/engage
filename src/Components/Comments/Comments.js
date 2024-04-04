import React, { useState } from 'react'
import "../Comments/Comments.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';


const Comments = ({cmt}) => {

    console.log("cmt",cmt[0].commentAuthors);

  return (
    <div className="overAllCommentList">
        <div className="commentList">
            <div className='commentList1'>
                <div className="commentHead">
                    {/* <div><img src={cmt.profilePic} /></div> */}
                    {cmt[0].commentAuthors.map(comment => (
                        <div>
                            <p><span>{comment.author}</span>{comment.commentDesc}</p>
                        </div>
                    ))}
                    
                </div>

                
            </div>

        
    </div>
    </div>
    
  )
}

export default Comments