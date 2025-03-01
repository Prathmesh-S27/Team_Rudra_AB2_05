import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Next.css";

const Next = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState('');
  const [infectedFiles, setInfectedFiles] = useState([]);
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [infectedFilesData, setInfectedFilesData] = useState([]);

  // Fetch infected files data from backend
  useEffect(() => {
    const fetchInfectedFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/infected-files');
        setInfectedFilesData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      }
    };
    fetchInfectedFiles();
  }, []);

  const handleActionClick = (directory) => {
    const selected = infectedFilesData.find(item => item.directory === directory);
    setSelectedDirectory(directory);
    setInfectedFiles(selected ? selected.files : []);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedDirectory('');
    setInfectedFiles([]);
  };

  const handleAction = async (action) => {
    try {
      const response = await axios.post('http://localhost:5000/api/action', {
        directory: selectedDirectory,
        action
      });
      setNotification(response.data.message);
      setTimeout(() => setNotification(''), 3000);
      handleClosePopup();
      setInfectedFilesData(infectedFilesData.filter(item => item.directory !== selectedDirectory));
    } catch (error) {
      console.error('Failed to perform action:', error);
    }
  };

  return (
    <div className={`nextPage ${isLoading ? 'blur' : ''}`}>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p className="loading-text">Scanning your system...</p>
        </div>
      ) : (
        <>
          {notification && (
            <div className="notification">
              <i className="notification-icon">✓</i>
              {notification}
            </div>
          )}
          
          <div className="dashboard-header">
            <i className="shield-icon">🛡</i>
            <h1>Ransomware Attack Checker</h1>
            <p className="dashboard-subtitle">Monitor and protect your system from ransomware threats</p>
          </div>
          
          <div className="table-container">
            <h2>Affected Locations</h2>
            <table className="ransomwareTable">
              <thead>
                <tr>
                  <th>Directory Path</th>
                  <th>Infected Files</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {infectedFilesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.directory}</td>
                    <td>{item.files.length}</td>
                    <td>
                      <button 
                        className="actionButton" 
                        onClick={() => handleActionClick(item.directory)}
                      >
                        <span className="button-icon">🔍</span> Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPopup && (
            <div className="popupOverlay">
              <div className="popupContent">
                <h3>Infected Files Detected in {selectedDirectory}</h3>
                <ul>
                  {infectedFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
                <button onClick={() => handleAction('delete')}>Delete</button>
                <button onClick={() => handleAction('ignore')}>Ignore</button>
                <button onClick={() => handleAction('quarantine')}>Quarantine</button>
                <button onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Next;
