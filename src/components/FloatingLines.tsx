'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FloatingLines.module.scss';

interface FloatingLinesProps {
    linesGradient?: string[];
    animationSpeed?: number;
    interactive?: boolean;
    bendRadius?: number;
    bendStrength?: number;
    mouseDamping?: number;
    parallax?: boolean;
    parallaxStrength?: number;
}

export const FloatingLines: React.FC<FloatingLinesProps> = ({
    linesGradient = ['#121112', '#505153', '#2a282a'],
    animationSpeed = 1,
    interactive = true,
    parallax = true,
    parallaxStrength = 0.2,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create lines
        const lines: Array<{
            x: number;
            y: number;
            length: number;
            angle: number;
            speed: number;
            color: string;
            opacity: number;
        }> = [];

        const lineCount = 30;
        for (let i = 0; i < lineCount; i++) {
            lines.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 150 + 50,
                angle: Math.random() * Math.PI * 2,
                speed: (Math.random() * 0.5 + 0.2) * animationSpeed,
                color: linesGradient[Math.floor(Math.random() * linesGradient.length)],
                opacity: Math.random() * 0.3 + 0.1,
            });
        }

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetMousePos.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        if (interactive) {
            canvas.addEventListener('mousemove', handleMouseMove);
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth mouse position
            if (interactive) {
                mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
                mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;
            }

            lines.forEach((line) => {
                // Update position
                line.x += Math.cos(line.angle) * line.speed;
                line.y += Math.sin(line.angle) * line.speed;

                // Parallax effect
                if (parallax && interactive) {
                    const dx = mousePos.current.x - line.x;
                    const dy = mousePos.current.y - line.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        line.x -= (dx / distance) * parallaxStrength;
                        line.y -= (dy / distance) * parallaxStrength;
                    }
                }

                // Wrap around edges
                if (line.x < -line.length) line.x = canvas.width + line.length;
                if (line.x > canvas.width + line.length) line.x = -line.length;
                if (line.y < -line.length) line.y = canvas.height + line.length;
                if (line.y > canvas.height + line.length) line.y = -line.length;

                // Draw line
                ctx.save();
                ctx.translate(line.x, line.y);
                ctx.rotate(line.angle);

                const gradient = ctx.createLinearGradient(0, 0, line.length, 0);
                gradient.addColorStop(0, `${line.color}00`);
                gradient.addColorStop(0.5, `${line.color}${Math.floor(line.opacity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${line.color}00`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(line.length, 0);
                ctx.stroke();
                ctx.restore();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (interactive) {
                canvas.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationId);
        };
    }, [linesGradient, animationSpeed, interactive, parallax, parallaxStrength]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
};
