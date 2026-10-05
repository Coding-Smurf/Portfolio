// ContactMe.jsx

import NavigationBar from '../components/NavigationBar.jsx';
import Seo from '../components/Seo.jsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import styles from './ContactMe.module.css';

export default function ContactMe() {
  const { t } = useTranslation('contact');
  const [fadeStarted, setFadeStarted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  // 'success' | 'error' | '' (the text is looked up at render time, so it follows the language)
  const [status, setStatus] = useState('');

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
    setStatus('');

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
        setStatus('success');
        setFormValues({ name: '', subject: '', email: '', message: '' });
        setSending(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setStatus('error');
        setSending(false);
      });
  };

  // Render the ContactMe page with navigation bar
  // and the rest of the content
  return (
    <main className={styles.container}>
      <Seo title={t('seo.title')} path="ContactMe" description={t('seo.description')} />
      <NavigationBar currentPage="ContactMe" />
      <div className={`${styles.landingContent} ${fadeStarted ? styles.fadeIn : ''}`}>
        <section className={styles.hero}>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className={styles.contactWrapper}>
            <div className={styles.infoColumn}>
              <ul>
                <li>
                  <div className={styles.infoTitle}>{t('info.phone')}</div>
                  <div><a href="tel:+34660164574" className={styles.infoContent}>+34 660 164 574</a></div>
                </li>
                <li>
                  <div className={styles.infoTitle}>{t('info.email')}</div>
                  <div><a href="mailto:adrian.ortiz.prof@gmail.com" className={styles.infoContent}>adrian.ortiz.prof@gmail.com</a></div>
                </li>
                <li>
                  <div className={styles.infoTitle}>{t('info.linkedin')}</div>
                  <div><a href="https://www.linkedin.com/in/adri-ortiz" target="_blank" rel="noopener noreferrer" className={styles.infoContent}>www.linkedin.com/in/adri-ortiz</a></div>
                </li>
                <li>
                  <div className={styles.infoTitle}>{t('info.address')}</div>
                  <div className={styles.infoContent}>{t('info.addressValue')}</div>
                </li>
              </ul>
            </div>
            <div className={styles.formColumn}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <label>
                    {t('form.name')}
                    <input type="text" name="name" placeholder={t('form.namePlaceholder')} value={formValues.name} onChange={handleInputChange} className={formValues.name ? styles.hasContent : ''} required />
                  </label>
                  <label>
                    {t('form.subject')}
                    <input type="text" name="subject" placeholder={t('form.subjectPlaceholder')} value={formValues.subject} onChange={handleInputChange} className={formValues.subject ? styles.hasContent : ''} required />
                  </label>
                </div>
                <label>
                  {t('form.email')}
                  <input type="email" name="email" placeholder={t('form.emailPlaceholder')} value={formValues.email} onChange={handleInputChange} className={formValues.email ? styles.hasContent : ''} required />
                </label>
                <label>
                  {t('form.message')}
                  <textarea name="message" rows="3" placeholder={t('form.messagePlaceholder')} value={formValues.message} onChange={handleInputChange} className={formValues.message ? styles.hasContent : ''} required></textarea>
                </label>
                {status && <div className={styles.statusMessage}>{t(`form.${status}`)}</div>}
                <button type="submit" disabled={!isFormValid() || sending}>
                  {sending ? t('form.sending') : t('form.send')}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}