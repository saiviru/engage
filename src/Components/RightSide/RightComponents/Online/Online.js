import React,{useEffect,useState} from 'react'
import "../Online/Online.css";
import { CiCirclePlus } from "react-icons/ci";
import { Modal, TextField, Button } from '@mui/material';


const Online = () => {
  const [jobs, setJobs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    jobId: '',
    jobTitle: '',
    jobDesc: '',
    expReq: '',
    jobLoc: ''
  });

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can send the form data to your backend API or perform any other action
    // Reset the form data and close the modal
    setFormData({
      jobId: '',
      jobTitle: '',
      jobDesc: '',
      expReq: '',
      jobLoc: ''
    });
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("data",data);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="online-comp">
    
      <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between'}}>
        <h2>Open Positions</h2>
        <CiCirclePlus style={{
              position: 'relative',
    top: '8px',
    right: '10px',
        }} size={20} color='grey' onClick={handleModalOpen}/>
      </div>
      

      <div style={{display: 'flex',flexDirection: 'column'}}>
        {jobs.map(job => (
          <div key={job.id} style={{
            border: '1px solid #f68401',borderRadius: '10px',padding: '4px 12px',marginBottom: '10px'}}>
            <h3>{job.jobTitle}</h3>
            <p>{job.jobDesc}</p>
            <div>
              <button 
               style={{
                padding: "5px 10px",
                background: 'linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)',
                borderRadius: '3px',
                fontSize: '13px',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
               }}
              >Refer Now</button>
            </div>
          </div>
        ))}
      </div>
       
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-container">
          <h2 id="modal-title">Add New Job</h2>
          <form onSubmit={handleSubmit}>
          <TextField
              label="Job ID"
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Job Description"
              name="jobDesc"
              value={formData.jobDesc}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Experience Required"
              name="expReq"
              value={formData.expReq}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Job Location"
              name="jobLoc"
              value={formData.jobLoc}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Submitted</Button>
          </form>
        </div>
      </Modal>


    </div>
  )
}

export default Online