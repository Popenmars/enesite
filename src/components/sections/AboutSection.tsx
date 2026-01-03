'use client';

import React from 'react';
import styles from './AboutSection.module.scss';

export const AboutSection: React.FC = () => {
    const tools = [
        'FL Studio',
        'Studio One',
        'Logic Pro',
        'Native Instruments',
        'Audio interfaces',
        'Plugins & virtual instruments',
        ' & Sure Digital Microphones',
        'MIDI & controllers',
    ];

    const genres = ['Afrobeats', 'Hip-Hop', 'Trap', 'Pop', 'R&B', 'Electronic', 'Jazz', 'Rock', 'Raggae', 'Classical'];

    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>About</span>
                    <h2 className={styles.title}>My Art, My Statement</h2>
                </div>

                <div className={styles.grid}>
                    <div className={styles.story}>
                        <h3>My Journey</h3>
                        <p>
                            Ene The Rave is a Nigerian music artist and producer whose work explores emotion, identity, and modern African expression through sound. As an emerging independent artist, Ene blends contemporary African influences with rap and alternative elements creating music that is both intimate and forward-looking.
                        </p>
                        <p>
                            Over the years, I&apos;ve developed a signature sound that merges atmospheric textures
                            with hard-hitting rhythms, creating immersive experiences that resonate with
                            listeners across the globe.
                        </p>
                    </div>

                    <div className={styles.genres}>
                        <h3>Genres</h3>
                        <div className={styles.tagList}>
                            {genres.map((genre) => (
                                <span key={genre} className={styles.genreTag}>
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.tools}>
                        <h3>Tools & Equipment</h3>
                        <ul className={styles.toolList}>
                            {tools.map((tool) => (
                                <li key={tool}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M13.5 4.5L6 12L2.5 8.5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};
