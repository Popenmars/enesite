'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './HireMeSection.module.scss';

const services = [
    {
        title: 'Music Production',
        description: 'Full track production from concept to final mix',
        features: ['Song Writing', 'Sound Design', 'Mixing & Mastering'],
    },
    {
        title: 'Collaboration',
        description: 'Work together on your next hit',
        features: ['Co-Production', 'Featured Artist', 'Remix Work'],
    },
    {
        title: 'Custom Scoring',
        description: 'Original music for film, games, and media',
        features: ['Film Scoring', 'Game Audio', 'Commercial Music'],
    },
];

export const HireMeSection: React.FC = () => {
    const handleContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hire" className={styles.hire}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Hire Me</span>
                    <h2 className={styles.title}>Let&apos;s Create Together</h2>
                </div>

                <div className={styles.services}>
                    {services.map((service) => (
                        <div key={service.title} className={styles.serviceCard}>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                            <ul className={styles.featureList}>
                                {service.features.map((feature) => (
                                    <li key={feature}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path
                                                d="M13.5 4.5L6 12L2.5 8.5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <h3>Ready to Start Your Project?</h3>
                        <p>
                            Whether you need a full production, a collaboration, or custom music for your
                            project, I&apos;m here to help bring your vision to life.
                        </p>
                        <Button onClick={handleContact} className={styles.primaryButton}>
                                Get in Touch
                        </Button>
                    </div>
                </div>
                <div className={styles.mars}>
                    <a href="https://martinpraise-profile.vercel.app/">designedby &lt;marsynergy /&gt;</a>
                </div>
            </div>
        </section>
    );
};
