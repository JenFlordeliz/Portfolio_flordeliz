import { useState } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // EmailJS credentials from .env
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Maica Margrette",
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log("Email sent:", response);
      setStatus({ 
        type: "success", 
        message: "✅ Message sent successfully! I'll get back to you soon." 
      });
      
      // Clear form
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error("Email error:", error);
      setStatus({ 
        type: "error", 
        message: "❌ Failed to send message. Please try again later." 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <NavBar />
      
      <div className="container mt-5">
        <div className="welcome-card">
          <h1>Contact Me</h1>
          <p>Have a question or want to work together? Send me a message!</p>

          {/* Status Message */}
          {status.message && (
            <div className={`alert alert-${status.type === "success" ? "success" : "danger"} mt-3`}>
              {status.message}
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3 text-start">
              <label className="form-label fw-bold">Your Name</label>
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
              <label className="form-label fw-bold">Your Email</label>
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
              <label className="form-label fw-bold">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="5"
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

          <div className="mt-5 pt-3 border-top">
            <h5>Or reach me directly:</h5>
            <p>📧 jennelyn.flordeliz@example.com</p>
            <p>📱 +63 912 345 6789</p>
            <p>🐙 GitHub: github.com/JennelynFlordeliz</p>
            <p>💼 LinkedIn: linkedin.com/in/JennelynFlordeliz</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;