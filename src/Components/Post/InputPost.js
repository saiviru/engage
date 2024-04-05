import "../Post/InputPost.css"
import Profile from "../../assets/profile.jpg"
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import {FaSmile} from "react-icons/fa"
import { useSelector } from 'react-redux'



const InputPost = ({handleSubmit,
                   setBody,
                   body,
                   images,
                   setImages
                  }) => {
                    const userData = useSelector((state) => state?.login?.users);

                    const handleFileUpload = (e) => {
                      const file = e.target.files[0];
                      setImages(file)
                      // Do something with the selected file
                      console.log('Selected file:', file);
                    };

  return (
     <div className="i-form">
        <form onSubmit={handleSubmit}>
            <div className="i-input-box">
                <img src={userData.ProfileImage} className='i-img'/>
                
                <input 
                type="text" 
                id="i-input" 
                placeholder={`What's in your mind ${userData.name}?`}
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                />
            </div>

     <div className="file-upload">
      <div className="file-icons">
          <label htmlFor="file" className="pv-upload">
            <PhotoLibraryIcon className="input-svg" style={{fontSize:"38px",color:"#253f51"}}/>
            <span className='photo-dis'>Photo</span>
          </label>
      </div>
       
          <button type='submit'>Share</button>
            
      </div>

        <div style={{display:"none"}} >
            <input 
            type="file" 
            id="file"
            accept=".png,jpeg,.jpg"
            onChange={(e)=>{handleFileUpload(e); setImages(e.target.files[0])}}
             />
          </div>

        {images && (
          <div className="displayImg">
            <CloseRoundedIcon onClick={()=>setImages(null)}/>
            <img src={URL.createObjectURL(images)} alt="" />
          </div>
        )}

        </form>
     </div>
  )
}

export default InputPost