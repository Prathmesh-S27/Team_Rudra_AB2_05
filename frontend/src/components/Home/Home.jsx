import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faFolderOpen, faArrowRight, faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import mp from './../../assets/mainpagelogo.png';

const Home = () => {
  const [address, setAddress] = useState('');
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Fetch internship data from backend
    const fetchInternships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/internships');
        setInternships(response.data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();

    // Create floating particles
    const generateParticles = () => {
      const newParticles = [];
      const count = window.innerWidth < 768 ? 15 : 30;
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 5 + 2}px`,
          duration: `${Math.random() * 10 + 10}s`,
          delay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);

    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        setAddress(response.data.filePath);
        console.log('Uploaded file path:', response.data.filePath);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const goToNextPage = () => {
    navigate('/next');
  };

  return (
    <div className="home-container">
      <div className="firstBackGround">
        <div className="particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                animation: `floatParticle ${particle.duration} ${particle.delay}`
              }}
            />
          ))}
        </div>

        <div className="content-card">
          <div className="logoContainer">
            <img src={mp} alt="Pradipti Logo" className="siteLogo" />
          </div>

          <div className="tagline-container">
            <p className="tagline">
              A powerful shield against ransomware attacks, safeguarding your data and privacy.
            </p>
          </div>

          <div className="search-section">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                className="internshipsInput"
                placeholder="Enter address to explore opportunities..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className="file-button">
                <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '8px' }} />
                <span>Browse</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <button className="next-button" onClick={goToNextPage}>
            <span>Continue to Next Page</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>

          <div className="decoration-element">
            <FontAwesomeIcon icon={faPaperPlane} className="plane-icon" />
          </div>

          <div className="internship-list">
            <h3>Available Internships:</h3>
            <ul>
              {internships.map((internship) => (
                <li key={internship.id}>
                  {internship.title} - {internship.location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
