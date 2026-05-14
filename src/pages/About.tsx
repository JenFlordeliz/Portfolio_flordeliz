import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { projectsData } from './Projects';
import type { ProjectData } from './Projects';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import profileImg from "../Images/Profile.jpeg";


const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // FIND PROJECT
  const project =
    (location.state?.project as ProjectData) ||
    projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <>
        <NavBar />

        <div className="container mt-5 text-center">

          <div className="welcome-card p-5">

            <h1 className="mb-3">
              ✨ Welcome to My Portfolio ✨
            </h1>

            <h2 className="mb-4">
              Hi, I'm Jennelyn R. Flordeliz 👋
            </h2>

            {/* PROFILE IMAGE */}
            <div className="text-center mb-4">
<img
  src={profileImg}
  alt="Jennelyn"
  className="img-fluid rounded-circle shadow-lg"
  style={{
    width: "220px",
    height: "220px",
    objectFit: "cover",
    border: "5px solid white"
  }}

              />

            </div>

            <p className="lead">
              I’m a 20-year-old student and aspiring web developer
              passionate about creating modern, responsive,
              and user-friendly websites and applications.
            </p>

            <p className="text-muted mt-3">
              This portfolio showcases my projects, skills,
              and experiences in web development using
              React, Node.js, Express, and MongoDB.
            </p>

            {/* SKILLS */}
            <div className="mt-4">

              <h4>💻 Skills</h4>

              <p>
                React • JavaScript • Node.js • Express • MongoDB •
                Bootstrap • HTML • CSS • REST APIs
              </p>

            </div>

            {/* ABOUT */}
            <div className="mt-4">

              <h4>🎯 About Me</h4>

              <p>
                I enjoy learning new technologies, solving problems,
                and designing creative web applications that provide
                a great user experience.
              </p>

            </div>

            {/* CAREER GOAL */}
            <div className="mt-4">

              <h4>🚀 Career Goal</h4>

              <p>
                My goal is to become a skilled full-stack developer
                and continue improving my abilities in both frontend
                and backend development.
              </p>

            </div>

            {/* BUTTON */}
            <button
              className="btn project-btn mt-4"
              onClick={() => navigate('/projects')}
            >
              Go to Projects
            </button>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  // PROJECT DETAILS PAGE
  return (
    <>
      <NavBar />

      <div className="project-details">

        <div className="container mt-5">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate('/projects')}
            className="btn btn-outline-secondary mb-5"
          >
            ← Back to Gallery
          </button>

          {/* MAIN HEADER */}
          <div className="text-center mb-5">

            <div className="project-icon-large">
              {project.icon}
            </div>

            <h1 className="display-2 fw-bold text-uppercase">
              {project.title}
            </h1>

            <h2 className="text-muted mb-4">
              {project.desc}
            </h2>

            {/* PROJECT IMAGE */}
            <div className="mb-4">

              <img
                src="/images/project-banner.jpg"
                alt={project.title}
                className="img-fluid rounded shadow-lg"
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  objectFit: "cover"
                }}
              />

            </div>

            <p
              className="fs-5 mx-auto"
              style={{
                maxWidth: '800px',
                lineHeight: '1.8'
              }}
            >
              {project.fullDesc}
            </p>

          </div>

          <hr className="my-5" />

          {/* LABS SECTION */}
          {project.labs.map((lab, index) => (

            <div
              key={index}
              className="lab-section mb-5 pb-5"
            >

              <div className="text-center mb-4">

                <h2 className="display-4 fw-bold mb-3">
                  {lab.name}
                </h2>

                <p
                  className="fs-5 text-muted mx-auto"
                  style={{ maxWidth: '700px' }}
                >
                  {lab.description}
                </p>

              </div>

              {/* LAB IMAGES */}
              <div className="row justify-content-center mb-4">

                {lab.images.map((imgUrl, imgIndex) => (

                  <div
                    className="col-12 mb-4"
                    key={imgIndex}
                  >

                    <img
                      src={imgUrl}
                      alt={`${lab.name} screenshot ${imgIndex + 1}`}
                      className="img-fluid rounded shadow-lg w-100"
                      style={{
                        objectFit: 'cover',
                        maxHeight: '500px'
                      }}
                    />

                  </div>

                ))}

              </div>

              {/* LIVE BUTTON */}
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