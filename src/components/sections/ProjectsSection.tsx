'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import styles from './ProjectsSection.module.scss';

const projects: Project[] = [
    {
        id: '1',
        title: 'Tasha Symphony',
        description: 'An atmospheric journey through lo-fi soundscapes and ambient textures.',
        platform: 'All Platforms',
        embedUrl: 'https://open.spotify.com/embed/track/2ynJB1D3sljUo3I8jlgxUw?si=oDhCCEguQI6u3SbF-KWOyA',
        releaseDate: '2024',
        link: 'https://onerpm.link/231954325443',
    },
    {
        id: '2',
        title: 'Steady',
        description: 'Experimental electronic piece blending organic and synthetic sounds.',
        platform: 'Unreleased',
        embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dily8qxog&public_id=enetrack3_fgwcdb&profile=cld-default',
        releaseDate: '----',
    },
    {
        id: '3',
        title: 'Problem N\'P',
        description: 'Experimental electronic piece blending organic and synthetic sounds.',
        platform: 'All Platforms',
        embedUrl: 'https://open.spotify.com/embed/track/68U5ItRzWBIA9AwhEdZr4E?si=rzId2_dUQ6SHjvP02NhTrw',
        releaseDate: '2024',
        link: 'https://open.spotify.com/track/68U5ItRzWBIA9AwhEdZr4E?si=rzId2_dUQ6SHjvP02NhTrw',
    },
    {
        id: '4',
        title: 'Unnamed',
        description: 'Blending hip-hop with R&B sound',
        platform: 'Unreleased',
        embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dily8qxog&public_id=enetrack1_zgk0wd&profile=cld-default',
        releaseDate: '----',
    },
    {
        id: '5',
        title: 'On Sight',
        description: 'Featured by TimGii on Amapiano',
        platform: 'All Platforms',
        embedUrl: 'https://open.spotify.com/embed/track/0cIYHBfiVpBc2VBvrpps7n?si=ol9zH8aaRnCuH7X1gAkLRQ',
        releaseDate: '2024',
        link: 'https://open.spotify.com/track/0cIYHBfiVpBc2VBvrpps7n?si=ol9zH8aaRnCuH7X1gAkLRQ',
    },
    {
        id: '6',
        title: 'Deserters Old',
        description: 'Experimental electronic piece blending organic and synthetic sounds.',
        platform: 'Unreleased',
        embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dily8qxog&public_id=enetrack2_nz03ya&profile=cld-default',
        releaseDate: '----',
    },
    {
        id: '7',
        title: 'Karashika',
        description: 'Producer duties collaborated with badboy thugger on this art.',
        platform: 'All Platforms',
        embedUrl: 'https://open.spotify.com/embed/track/224zMLb6mV9u76Y9g7Ikh5?si=AxO89doOQDaXKfcB6s_EqQ',
        releaseDate: '2024',
        link: 'https://open.spotify.com/track/224zMLb6mV9u76Y9g7Ikh5?si=AxO89doOQDaXKfcB6s_EqQ',
    },
    {
        id: '8',
        title: 'Gangster Cry',
        description: 'This is a cover of the song "Gangster Cry" by Victony',
        platform: 'Unreleased',
        embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dily8qxog&public_id=VN20260103_001413_2_dt12ne&profile=cld-default',
        releaseDate: '----',
    },
    {
        id: '9',
        title: 'Isolo Riddim',
        description: 'Experimental electronic piece blending organic and synthetic sounds.',
        platform: 'Unreleased',
        embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dily8qxog&public_id=enetarck6_x6yfg3&profile=cld-default',
        releaseDate: '----',
    },
];

export const ProjectsSection: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<string>('');
    const [selectedPlatform, setSelectedPlatform] = useState<string>('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showAllModal, setShowAllModal] = useState(false);

    const handleListenClick = (project: Project, e: React.MouseEvent) => {
        if (project.platform === 'Unreleased' || project.platform === 'Beats') {
            e.preventDefault();
            setSelectedTrack(project.title);
            setSelectedPlatform(project.platform);
            setShowModal(true);
            setSubscribed(false);
            setEmail('');
        }
    };

    useEffect(() => {
        if (showAllModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showAllModal]);


    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    trackTitle: selectedTrack,
                    platform: selectedPlatform
                }),
            });

            if (res.ok) {
                setSubscribed(true);
                setTimeout(() => {
                    setShowModal(false);
                    setSubscribed(false);
                    setEmail('');
                }, 2000);
            }
        } catch (error) {
            console.error('Subscription failed', error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail('');
    };

    const closeAllModal = () => {
        setShowAllModal(false);
    };

    const projectCard = (project: Project) => (
        <div key={project.id} className={styles.projectCard}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <span className={styles.year}>{project.releaseDate}</span>
                </div>

                <p className={styles.description}>{project.description}</p>

                {project.platform && (
                    <div className={styles.platform}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{project.platform}</span>
                    </div>
                )}

                {project.embedUrl && (
                    <div className={styles.embedContainer}>
                        <iframe
                            src={project.embedUrl}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={project.title}
                            scrolling="no"
                            style={{ overflow: 'hidden' }}
                        />
                    </div>
                )}

                {project.link ? (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.listenButton}
                        onClick={(e) => handleListenClick(project, e)}
                    >
                        <span>Listen Now</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                ) : (
                    <button
                        className={styles.listenButton}
                        onClick={(e) => handleListenClick(project, e)}
                    >
                        <span>Listen Now</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Projects</span>
                    <h2 className={styles.title}>Selected Works</h2>
                    <p className={styles.subtitle}>
                        A curated collection of releases, collaborations, and sonic experiments
                    </p>
                </div>

                <div className={styles.grid}>
                    {projects.slice(0, 6).map((project) => projectCard(project))}
                </div>

                {projects.length > 6 && (
                    <div className={styles.seeMoreContainer}>
                        <button
                            className={styles.seeMoreButton}
                            onClick={() => setShowAllModal(true)}
                        >
                            <span>See More Projects</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                        </button>
                    </div>
                )}

                {showAllModal && (
                    <div
                        className={styles.allProjectsOverlay}
                        onClick={closeAllModal}
                    >
                        <div
                        className={styles.allProjectsContent}
                        onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h2>All Projects</h2>
                                <button
                                className={styles.closeButton}
                                onClick={closeAllModal}
                                aria-label="Close modal"
                                >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                </button>
                            </div>

                            <div className={styles.modalGrid1}>
                                <div className={styles.modalGrid}>
                                    {projects.map((project) => projectCard(project))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {showModal && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                            {subscribed ? (
                                <div className={styles.successMessage}>
                                    <h3>You&apos;re on the list!</h3>
                                    <p>We&apos;ll let you know when {selectedTrack} drops.</p>
                                </div>
                            ) : (
                                <>
                                    <h3>Stay Updated</h3>
                                    <p>Subcribe to know when <strong>{selectedTrack}</strong> is released.</p>
                                    <form onSubmit={handleSubscribe} className={styles.modalForm}>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className={styles.modalInput}
                                        />
                                        <div className={styles.modalActions}>
                                            <button type="button" onClick={closeModal} className={styles.cancelButton}>
                                                Cancel
                                            </button>
                                            <button type="submit" disabled={loading} className={styles.submitButton}>
                                                {loading ? 'Subscribing...' : 'Subscribe'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
