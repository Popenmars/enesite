'use client';

import React from 'react';
import styles from './HeroSection.module.scss';

export const HeroSection: React.FC = () => {
    const scrollToNext = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.tag}>
                    <span>PRODUCER</span>
                    <span className={styles.dot}>•</span>
                    <span>ARTIST</span>
                </div>

                <h1 className={styles.name}>
                    <span className={styles.firstName}>Ene</span><span className={styles.lastName}>TheRave</span>
                </h1>

                <p className={styles.headline}>
                    Recording Artist, Mix and Mastering Engineer.
                </p>

                <p className={styles.intro}>
                    A Nigerian artist and producer blending contemporary African sound with global influences, focused on experimental storytelling, sonic identity, and cross cultural collaboration. 
                </p>

                <button onClick={scrollToNext} className={styles.scrollIndicator} aria-label="Scroll to next section">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    );
};
