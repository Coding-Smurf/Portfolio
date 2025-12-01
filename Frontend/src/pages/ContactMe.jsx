// ContactMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactMe.module.css';

export default function ContactMe() {
  const [fadeStarted, setFadeStarted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    requestAnimationFrame(() => {
      setFadeStarted(true);
    });
    const timer = setTimeout(() => {
      document.body.style.overflowY = 'auto';
    }, 1000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = 'auto';
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formValues.name.trim() !== '' &&
      formValues.subject.trim() !== '' &&
      emailRegex.test(formValues.email) &&
      formValues.message.trim() !== ''
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage('');

    // EmailJS configuration
    const serviceId = 'service_9281u4d';
    const templateId = 'template_sc1cdki';
    const publicKey = 'ZmvUljzVZYWBvN4QP';

    const templateParams = {
      from_name: formValues.name,
      from_email: formValues.email,
      subject: formValues.subject,
      message: formValues.message,
      to_email: 'adrian.ortiz.prof@gmail.com'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatusMessage('Message sent successfully! ✓');
        setFormValues({ name: '', subject: '', email: '', message: '' });
        setSending(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setStatusMessage('Failed to send message. Please try again.');
        setSending(false);
      });
  };

  // Render the ContactMe page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>
      <NavigationBar currentPage="ContactMe" />
      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        <section className={styles.hero}>
          <h1>CONTACT ME</h1>
          <p>𝕲𝖊𝖙 𝖎𝖓 𝖙𝖔𝖚𝖈𝖍 𝖜𝖎𝖙𝖍 𝖒𝖊 𝖋𝖔𝖗 𝖈𝖔𝖑𝖑𝖆𝖇𝖔𝖗𝖆𝖙𝖎𝖔𝖓 𝖔𝖗 𝖏𝖚𝖘𝖙 𝖆 𝖋𝖗𝖎𝖊𝖓𝖉𝖑𝔂 𝖈𝖍𝖆𝖙!</p>
          <div className={styles.contactWrapper}>
            <div className={styles.infoColumn}>
              <ul>
                <li>
                  <div className={styles.infoTitle}>PHONE</div>
                  <div className={styles.infoContent}>+34 660164574</div>
                </li>
                <li>
                  <div className={styles.infoTitle}>EMAIL</div>
                  <div className={styles.infoContent}>adrian.ortiz.prof@gmail.com</div>
                </li>
                <li>
                  <div className={styles.infoTitle}>LINKEDIN</div>
                  <div className={styles.infoContent}>www.linkedin.com/in/adri-ortiz</div>
                </li>
                <li>
                  <div className={styles.infoTitle}>ADDRESS</div>
                  <div className={styles.infoContent}>Madrid, Spain</div>
                </li>
              </ul>
            </div>
            <div className={styles.formColumn}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <label>
                    Name
                    <input type="text" name="name" placeholder="Your name" value={formValues.name} onChange={handleInputChange} className={formValues.name ? styles.hasContent : ''} required />
                  </label>
                  <label>
                    Subject
                    <input type="text" name="subject" placeholder="Subject" value={formValues.subject} onChange={handleInputChange} className={formValues.subject ? styles.hasContent : ''} required />
                  </label>
                </div>
                <label>
                  Email
                  <input type="email" name="email" placeholder="Your email" value={formValues.email} onChange={handleInputChange} className={formValues.email ? styles.hasContent : ''} required />
                </label>
                <label>
                  Message
                  <textarea name="message" rows="3" placeholder="Your message..." value={formValues.message} onChange={handleInputChange} className={formValues.message ? styles.hasContent : ''} required></textarea>
                </label>
                {statusMessage && <div className={styles.statusMessage}>{statusMessage}</div>}
                <button type="submit" disabled={!isFormValid() || sending}>
                  {sending ? 'SENDING...' : 'SEND →'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}