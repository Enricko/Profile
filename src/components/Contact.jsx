import React, { useState } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem('name').value;
    const email = form.elements.namedItem('email').value;
    const message = form.elements.namedItem('message').value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    setSent(true);
    window.location.href = `mailto:enricko.putra028@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// contact</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <p className="contact-desc text-muted reveal-on-scroll delay-100">
          Currently open for new opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>

        <div className="contact-container">
          <div className="contact-info reveal-on-scroll delay-200">
            <div className="glass-card info-card">
              <Mail className="info-icon" size={32} />
              <h4>Email Me</h4>
              <p className="text-muted mb-2">I respond quickly to direct emails.</p>
              <a href="mailto:enricko.putra028@gmail.com" className="contact-link text-gradient">enricko.putra028@gmail.com</a>
            </div>

            <div className="glass-card info-card">
              <MapPin className="info-icon" size={32} />
              <h4>Location</h4>
              <p className="text-muted mb-2">Indonesia</p>
              <span className="contact-link text-gradient">Open to Remote Work</span>
            </div>
          </div>

          <form className="glass-card contact-form reveal-on-scroll delay-300" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name <span className="required" aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" autoComplete="name" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email <span className="required" aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" autoComplete="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message <span className="required" aria-hidden="true">*</span></label>
              <textarea id="message" name="message" rows="5" placeholder="Your message here..." required></textarea>
            </div>

            <button type="submit" className={`btn btn-primary submit-btn ${sent ? 'sent' : ''}`} disabled={sent} aria-live="polite">
              {sent ? (<>Opening mail… <Check size={18} /></>) : (<>Send Message <Send size={18} /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
