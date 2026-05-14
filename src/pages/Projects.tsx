import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'


// Type for the specific Labs
export type LabData = {
  name: string;
  description: string;
  link: string;
  images: string[];
};

// Update the main ProjectData to hold an array of Labs
export type ProjectData = {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  icon: string;
  labs: LabData[];
};

// The Data Structure
export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "FIRST GRADING",
    desc: "Project 1",
    fullDesc: "These are the projects I completed during my first grading period, focusing on basic structure and logic. I learned fundamental React concepts including components, props, and state management.",
    icon: "📘",
    labs: [
      {
        name: "FGLAB2",
        description: "Implementing state and interactivity with React hooks.",
        link: "https://jenflordeliz.github.io/fg_lab2_flordeliz1/",
        images: ["/src/Images/Asset2.png"]
      },
      {
        name: "FGLAB3",
        description: "Connecting to a simple database and handling data flow.",
        link: "https://jenflordeliz.github.io/Aptech_Flordeliz1/",
        images: ["/src/Images/Asset3.png"]
      }
    ]
  },
  {
    id: 2,
    title: "MIDTERM",
    desc: "Project 2",
    fullDesc: "During the midterm, I dove deep into React DOM and routing to create seamless navigation. I mastered React Router, component lifecycle, and API integration.",
    icon: "🔀",
    labs: [
      
      {
        name: "MIDTERMLAB2",
        description: "Advanced component splitting, props drilling, and state lifting.",
        link: "https://jenflordeliz.github.io/MG_LAB5_Flordeliz/",
        images: ["/src/Images/Assets4.png"]
      },
      {
        name: "MIDTERMLAB3",
        description: "Midterm final assessment project with full CRUD operations.",
        link: "https://jenflordeliz.github.io/MG_LAB3_FLORDELIZ/",
        images: ["/src/Images/Asset5.png", "/src/Images/Asset6.png"]
      }
    ]
  },
  {
    id: 3,
    title: "FINALS",
    desc: "Project 3",
    fullDesc: "My finals projects brought everything together, utilizing hooks, APIs, and advanced styling. I built full-stack applications with MongoDB, Express, and Node.js.",
    icon: "⚙️",
    labs: [
      {
        name: "FINLAB1",
        description: "Fetching external APIs and handling asynchronous data.",
        link: "https://jenflordeliz.github.io/finals_lab1_flordeliz/",
        images: ["/src/Images/Asset7.png"]
      },
     
    ]
  }
];

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectClick = (proj: ProjectData) => {
    navigate(`/project/${proj.id}`, { state: { project: proj } });
  };

  return (
    <>
      <NavBar />
      <div className="projects-gallery">
        <div className="container mt-5">
          <div className="text-center mb-5">
            <h1 className="display-3 fw-bold mb-3">MY PROJECT GALLERY</h1>
            <p className="fs-5 text-muted">Explore my journey through First Grading, Midterm, and Finals</p>
          </div>

          <div className="row justify-content-center">
            {projectsData.map((proj) => (
              <div className="col-lg-4 col-md-6 mb-5" key={proj.id}>
                <div
                  className="project-gallery-card"
                  onClick={() => handleProjectClick(proj)}
                >
                  <div className="card-icon">{proj.icon}</div>
                  <h2 className="card-title">{proj.title}</h2>
                  <h4 className="card-subtitle">{proj.desc}</h4>

                  <div className="labs-preview">
                    <h5>Included Labs:</h5>
                    <ul>
                      {proj.labs.map((lab, index) => (
                        <li key={index}>📌 {lab.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer-badge">
                    <span>View All Labs Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;