import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, Coffee, ExternalLink } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = 'enricko.putra028@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    setSent(true);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// collaborate</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <p className="contact-desc text-muted reveal-on-scroll delay-100">
          Have an engineering challenge, an interesting product to build, or a technical inquiry?
          Drop me a line and let's craft something remarkable.
        </p>

        <div className="contact-container">
          <div className="contact-info reveal-on-scroll delay-200">
            {/* Direct Email Card */}
            <div className="glass-card info-card">
              <div className="info-icon-wrapper">
                <Mail className="info-icon" size={26} />
              </div>
              <h4>Direct Email</h4>
              <p className="text-muted mb-2">Fast response time for opportunities and inquiries.</p>
              <div className="email-action-row">
                <a href={`mailto:${emailAddress}`} className="contact-link text-gradient">
                  {emailAddress}
                </a>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={14} className="copied" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Location & Remote Availability */}
            <div className="glass-card info-card">
              <div className="info-icon-wrapper">
                <MapPin className="info-icon" size={26} />
              </div>
              <h4>Location &amp; Remote</h4>
              <p className="text-muted mb-2">Based in Yogyakarta, Indonesia.</p>
              <span className="contact-status-tag">
                <span className="live-dot-green" /> Open to Remote Work Worldwide
              </span>
            </div>

            {/* Saweria Supporter Card */}
            <div className="glass-card info-card saweria-card">
              <div className="info-icon-wrapper coffee">
                <Coffee className="info-icon coffee-icon" size={26} />
              </div>
              <h4>Support My Work</h4>
              <p className="text-muted mb-2">Appreciate open-source tools and projects? Buy me a coffee on Saweria.</p>
              <a
                href="https://saweria.co/Lufria"
                target="_blank"
                rel="noreferrer"
                className="saweria-btn"
              >
                <span>saweria.co/Lufria</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form className="glass-card contact-form reveal-on-scroll delay-300" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="john@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message / Project Scope</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me about your product, timeline, and engineering needs..."
                required
              ></textarea>
            </div>

            <button type="submit" className={`btn btn-primary submit-btn ${sent ? 'sent' : ''}`}>
              {sent ? (
                <>
                  Opening Mail Client… <Check size={18} />
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
