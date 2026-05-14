import axios from "axios";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface Project {
  _id: string;
  title: string;
  description: string;
}

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/projects"
        );

        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Jennelyn R. Flordeliz",
        reply_to: formData.email,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setStatus({
        type: "success",
        message: "✅ Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Email error:", error);

      setStatus({
        type: "error",
        message: "❌ Failed to send message.",
      });

    } finally {
      setIsSending(false);
    }
  };
 void projects;
 void loading;
  return (
    <>
      <NavBar />

      <div className="container welcome-section">
        <div className="welcome-card">

          <h1>WELCOME TO MY PORTFOLIO</h1>

          <p>
            Hello! I’m Jennelyn R. Flordeliz, and welcome to my
            APTECH portfolio.
          </p>

          <p>
            This portfolio features the collection of projects
            I have created using React throughout my learning
            journey, from the first grading period up to the finals.
          </p>

          <p>
            Each project highlights the skills, creativity,
            and experience I’ve gained in developing interactive,
            responsive, and user-friendly web applications.
          </p>

          <p>
            I’m passionate about turning ideas into functional
            and visually appealing digital experiences through code.
            Feel free to explore my projects and see how I continue
            to grow as an aspiring web developer.
          </p>

        </div>
      </div>

      <div className="container contact-section mt-5">
        <div className="section-title">
          <h3>Contact Me</h3>
        </div>

        <div className="welcome-card mt-4">

          <p>
            Have a question or want to work together?
            Send me a message!
          </p>

          {status.message && (
            <div
              className={`alert ${
                status.type === "success"
                  ? "alert-success"
                  : "alert-danger"
              } mt-3`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3 text-start">
              <label className="form-label fw-bold">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bold">
                Your Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bold">
                Message
              </label>

              <textarea
                name="message"
                className="form-control"
                rows={5}
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>

            <button
              type="submit"
              className="btn project-btn"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;