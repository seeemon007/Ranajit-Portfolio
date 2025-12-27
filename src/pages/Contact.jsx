import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

import "../CSS/Contact.css"
import '../index.css' 

const publicUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errorDetail, setErrorDetail] = useState("");

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isEmailJsConfigured = Boolean(
    EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.contact || !form.subject || !form.message) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const isEmail = emailPattern.test(form.contact);
    if (!isEmail && isNaN(form.contact)) {
      setStatus("⚠️ Please enter a valid email or phone number.");
      return;
    }

    if (!isEmailJsConfigured) {
      setStatus(
        "⚠️ Email service not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.local and restart the dev server."
      );
      setErrorDetail(
        "Tip: In your EmailJS template, use variables: from_name, contact_info, subject, message."
      );
      return;
    }

    setStatus("Sending...");
    setErrorDetail("");

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          contact_info: form.contact,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setForm({ name: "", contact: "", subject: "", message: "" });
        },
        (error) => {
          console.error("EmailJS FAILED", error);
          const msg =
            (error?.text || error?.message || "Unknown error") +
            (error?.status ? ` (status ${error.status})` : "");
          setStatus("❌ Failed to send.");
          setErrorDetail(
            `Reason: ${msg}. If this persists, verify service/template/public key and template variables match.`
          );
        }
      );
  };

  const quickLinks = [
    { img: publicUrl('github.png'), title: "GitHub", link: "https://github.com/seeemon007" },
    { img: publicUrl('linkedin.png'), title: "LinkedIn", link: "https://www.linkedin.com/in/ranajit-karmakar/" },
    { img: publicUrl('gmail.png'), title: "Email", link: "mailto:ranajitk200@gmail.com" },
    { img: publicUrl('whatsapp.png'), title: "WhatsApp", link: "https://wa.me/+919382246603" },
    // { img: publicUrl('insta.png'), title: "Instagram", link: "https://www.instagram.com/kunj_2834/" },
    // { img: publicUrl('facebook.png'), title: "Facebook", link: "https://www.facebook.com/kunj.desai.222608" },
  ];

  return (
    <section className="contact-section">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-title"
      >
        Let’s Connect & Collaborate 🤝
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="contact-subtitle"
      >
        Whether it’s a new project, a collaboration, or just to say hi — I’d love to hear from you!
      </motion.p>

      {/* Quick Links */}
      <motion.div className="contact-links">
        {quickLinks.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <motion.img
              src={item.img}
              alt={item.title}
              className="social-icon"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="contact-form"
      >
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Your Email or Phone" value={form.contact} onChange={handleChange} required />
        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message..." value={form.message} onChange={handleChange} rows="5" required />
        <motion.button type="submit" className="contact-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          🚀 Send Message
        </motion.button>

        {status && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="contact-status"
          >
            {status}
          </motion.p>
        )}
        {errorDetail && (
          <motion.pre
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="contact-status"
            style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
          >
            {errorDetail}
          </motion.pre>
        )}
      </motion.form>
    </section>
  );
}
