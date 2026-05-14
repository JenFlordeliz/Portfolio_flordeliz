import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { projectsData } from './Projects';
import type { ProjectData } from './Projects';

interface AdminProps {
  onBack?: () => void;
}

const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const navigate = useNavigate();

  // STATES
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // LOAD PROJECTS
  useEffect(() => {
    setProjects(projectsData);
  }, []);

  // LOGIN FUNCTION
  const handleLogin = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  // DELETE PROJECT
  const deleteProject = (id: number | string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );

    if (confirmDelete) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  // VIEW PROJECT
  const viewProject = (project: ProjectData) => {
    navigate(`/project/${project.id}`, {
      state: { project },
    });
  };

  // EDIT PROJECT
  const editProject = (project: ProjectData) => {
    alert(`Edit function for "${project.title}"`);

    // OPTIONAL:
    // navigate(`/edit-project/${project.id}`);
  };

  // LOGIN PAGE
  if (!authenticated) {
    return (
      <>
        <NavBar />

        <div className="container mt-5">
          <div
            className="card shadow-lg p-5 mx-auto text-center"
            style={{ maxWidth: '500px' }}
          >
            <h1 className="mb-4">Admin Login</h1>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <button
                className="btn btn-dark me-2"
                onClick={handleLogin}
              >
                Login
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    navigate('/');
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // ADMIN DASHBOARD
  return (
    <>
      <NavBar />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold">Projects Admin Dashboard</h1>
            <p className="text-muted">
              Manage your portfolio projects
            </p>
          </div>

          <button
            className="btn btn-outline-dark"
            onClick={() => setAuthenticated(false)}
          >
            Exit Admin
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Full Description</th>
                <th>Labs</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>

                  <td style={{ fontSize: '30px' }}>
                    {project.icon}
                  </td>

                  <td className="fw-bold">
                    {project.title}
                  </td>

                  <td>{project.desc}</td>

                  <td>
                    {project.fullDesc?.substring(0, 80)}...
                  </td>

                  <td>
                    {project.labs.length}
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => editProject(project)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => viewProject(project)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h5>Total Projects: {projects.length}</h5>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;