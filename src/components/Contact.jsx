import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, Coffee, ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';
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
        <SectionHead
          index="07"
          label="Contact"
          title={<>Have something in mind? <em>Let's talk.</em></>}
        >
          Have an engineering challenge, an interesting product to build, or a technical inquiry?
          Drop me a line and let's craft something remarkable.
        </SectionHead>

        <div className="contact-grid">
          <ul className="contact-info reveal-on-scroll delay-100">
            <li className="contact-row">
              <span className="icon-box"><Mail size={18} /></span>
              <div className="contact-row-body">
                <span className="contact-label">Email</span>
                <div className="email-row">
                  <a href={`mailto:${emailAddress}`} className="contact-value">{emailAddress}</a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    title="Copy email to clipboard"
                  >
                    {copied ? <Check size={14} className="copied" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </li>

            <li className="contact-row">
              <span className="icon-box"><MapPin size={18} /></span>
              <div className="contact-row-body">
                <span className="contact-label">Location</span>
                <span className="contact-value">Yogyakarta, Indonesia</span>
                <span className="pill pill-accent contact-remote">
                  <span className="live-dot" aria-hidden="true" /> Open to remote work worldwide
                </span>
              </div>
            </li>

            <li className="contact-row">
              <span className="icon-box"><Coffee size={18} /></span>
              <div className="contact-row-body">
                <span className="contact-label">Support my work</span>
                <p className="contact-note">Appreciate open-source tools and projects? Buy me a coffee on Saweria.</p>
                <a href="https://saweria.co/Lufria" target="_blank" rel="noreferrer" className="contact-value contact-link">
                  saweria.co/Lufria <ArrowUpRight size={15} />
                </a>
              </div>
            </li>
          </ul>

          <form className="card contact-form reveal-on-scroll delay-200" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Your name</label>
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
                <label htmlFor="contact-email">Email address</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message / project scope</label>
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Tell me about your product, timeline, and engineering needs..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              {sent ? (
                <>
                  Opening mail client… <Check size={17} />
                </>
              ) : (
                <>
                  Send message <Send size={16} className="icon-shift" />
                </>
              )}
            </button>
            <p className="form-hint">Opens your email app with the message pre-filled.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
