import styles from '../styles/Contact.module.css';

import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import Image from 'next/image';

import images from '@/assets/index'

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      {/* Left Section */}
      <div className={styles.left}>
        <div className={styles.profileImageWrapper}>
          <Image 
            src={images.profile} 
            alt="Profile Image" 
            width={180} 
            height={180} 
            className={styles.profileImage}
          />
        </div>
        <h2 className={styles.name}>Mehrab Hossain Shakib</h2>
        <p> Student | Blockchain Enthusiast </p>
        <p> Comilla University </p>
        <p className={styles.description}>
          Blockchain Developer passionate about building efficient, scalable web solutions.
        </p>
      </div>

      {/* Right Section */}
      <div className={styles.right}>
        <div className={styles.contactCard}>
          <h3 className={styles.cardTitle}>Contact Me</h3>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <FaLinkedin className={styles.icon} />
              <a href="https://www.linkedin.com/in/mehrab-hossain-shakib-4b4293242/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className={styles.contactItem}>
              <FaGithub className={styles.icon} />
              <a href="https://github.com/mehrab-shakib" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.icon} />
              <a href="mailto:shakibmehrab@gmail.com">shakibmehrab@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <FaPhone className={styles.icon} />
              <span>+8801859640812</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
