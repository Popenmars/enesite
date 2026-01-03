'use client';

import React from 'react';
import { FloatingLines } from './FloatingLines';
import styles from './BackgroundLayers.module.scss';

export const BackgroundLayers: React.FC = () => {
    return (
        <>
            {/* Dark Dot Matrix Background */}
            <div
                className={styles.dotMatrix}
                style={{
                    backgroundColor: '#0a0a0a',
                    backgroundImage: `
            radial-gradient(circle at 50% 50%, #222222 3px, transparent 1.5px),
            radial-gradient(circle at 95% 95%, #111111 3px, transparent 1.5px)
            `,
                    backgroundSize: '20px 20px',
                    imageRendering: 'pixelated' as const,
                }}
            />

            {/* Floating Lines Animated Layer */}
            <div className={styles.floatingLinesContainer}>
                <FloatingLines
                    linesGradient={['#FFFFFF', '#DDDDDD', '#AAAAAA']}
                    animationSpeed={1}
                    interactive
                    bendRadius={10}
                    bendStrength={-0.5}
                    mouseDamping={0.05}
                    parallax
                    parallaxStrength={0.1}
                />
            </div>
        </>
    );
};
