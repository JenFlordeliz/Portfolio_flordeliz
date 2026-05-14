import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { projectsData } from './Projects';
import type { ProjectData } from './Projects';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // DEBUGGING: Log all data to check
  console.log('========== PROJECT DETAILS DEBUG ==========');
  console.log('1. All projects data:', projectsData);
  console.log('2. Looking for project ID:', id);
  console.log('3. ID type:', typeof id);
  console.log('4. Location state:', location.state);
  console.log('5. Location state project:', location.state?.project);

  // Find the project
  const project = (location.state?.project as ProjectData) || projectsData.find(p => p.id.toString() === id);

  console.log('6. Found project:', project);
  console.log('==========================================');

  if (!project) {
    return (
      <>
        <NavBar />
        <div className="container mt-5 text-center">
          <div className="welcome-card">
            <h2>Project Not Found!</h2>
            <p className="text-muted">Debug: Looking for ID "{id}"</p>
            <button className="btn project-btn mt-3" onClick={() => navigate('/projects')}>
              Back to Projects
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="project-details">
        <div className="container mt-5">
          <button
            onClick={() => navigate('/projects')}
            className="btn btn-outline-secondary mb-5"
          >
            ← Back to Gallery
          </button>

          {/* Main Header */}
          <div className="text-center mb-5">
            <div className="project-icon-large">{project.icon}</div>
            <h1 className="display-2 fw-bold text-uppercase">{project.title}</h1>
            <h2 className="text-muted mb-4">{project.desc}</h2>
            <p className="fs-5 mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>
              {project.fullDesc}
            </p>
          </div>

          <hr className="my-5" />

          {/* Labs Section */}
          {project.labs.map((lab, index) => (
            <div key={index} className="lab-section mb-5 pb-5">
              <div className="text-center mb-4">
                <h2 className="display-4 fw-bold mb-3">{lab.name}</h2>
                <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '700px' }}>
                  {lab.description}
                </p>
              </div>

              {/* Images Gallery */}
              <div className="row justify-content-center mb-4">
                {lab.images.map((imgUrl, imgIndex) => (
                  <div className="col-12 mb-4" key={imgIndex}>
                    <img
                      src={imgUrl}
                      alt={`${lab.name} screenshot ${imgIndex + 1}`}
                      className="img-fluid rounded shadow-lg w-100"
                      style={{ objectFit: 'cover', maxHeight: '500px' }}
                    />
                  </div>
                ))}
              </div>

              {/* Live Link Button */}
              <div className="text-center mt-4">
                <a
                  href={lab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn project-btn btn-lg"
                >
                  🚀 Test {lab.name} Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;