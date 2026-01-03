'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ContactFormData, SocialLink } from '@/types';
import styles from './ContactSection.module.scss';

const socialLinks: SocialLink[] = [
    { platform: 'Spotify', url: 'https://open.spotify.com/artist/2Ie9I83kNfc1cJejJMFLuu?si=Pd2f_n-RQcebM2qBEIBI7Q', icon: 'spotify' },
    { platform: 'Twitter', url: 'https://x.com/enetr_', icon: 'twitter' },
    { platform: 'Instagram', url: '#', icon: 'instagram' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@ene.tr_', icon: 'tiktok' },
];

export const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });


    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value.trim()) newErrors[key] = "Please fill this field";
        });
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSending(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSent(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSent(false), 3000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Contact</span>
                    <h2 className={styles.title}>Let&apos;s Connect</h2>
                </div>

                <div className={styles.content}>
                    <div className={styles.formWrapper}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                    className={styles.input}
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                    className={styles.input}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    required
                                    rows={6}
                                    className={styles.textarea}
                                />
                                {errors.message && <span className="error">{errors.message}</span>}
                            </div>

                            <Button type="submit" className={styles.submitButton} disabled={sending || sent}>
                                {sent ? (
                                    <>  Sent to enE</>
                                ) : sending ? (
                                    "Sending to enE..."
                                ) : (
                                    <>Send Message</>
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.infoCard}>
                            <h3>Get in Touch</h3>
                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M2.5 6.66667L9.0755 11.0504C9.63533 11.4236 10.3647 11.4236 10.9245 11.0504L17.5 6.66667M4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span><a href="mailto:enetherave@gmail.com" target='_blank' rel='noopener noreferrer'>enetherave@gmail.com</a></span>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span><a href="tel:+2347066886178" target='_blank' rel='noopener noreferrer'>+234 706 688 6178</a></span>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>Owerri, Nigeria - Remotely Available</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <h3>Follow Me</h3>
                            <div className={styles.socialLinks}>
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.platform}
                                        href={link.url}
                                        className={styles.socialLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.platform}
                                        data-platform={link.icon}
                                    >
                                        {link.icon === 'spotify' && (
                                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                        )}
                                        {link.icon === 'twitter' && (
                                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        )}
                                        {link.icon === 'instagram' && (
                                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.088 21.89 6.813 21.94 7.878C21.988 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.723 17.912 21.475 18.55C21.2247 19.2177 20.8311 19.8226 20.322 20.322C19.822 20.8306 19.2173 21.2242 18.55 21.475C17.912 21.723 17.187 21.89 16.122 21.94C15.056 21.99 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.723 5.45 21.475C4.78231 21.2247 4.17743 20.8311 3.678 20.322C3.16943 19.822 2.77583 19.2172 2.525 18.55C2.277 17.912 2.11 17.187 2.06 16.122C2.01 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.813 2.277 6.088 2.525 5.45C2.7753 4.78231 3.1689 4.17743 3.678 3.678C4.17793 3.1694 4.78263 2.7758 5.45 2.525C6.088 2.277 6.813 2.11 7.878 2.06C8.944 2.01 9.283 2 12 2ZM12 7C9.239 7 7 9.239 7 12C7 14.761 9.239 17 12 17C14.761 17 17 14.761 17 12C17 9.239 14.761 7 12 7ZM18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75ZM12 9C13.657 9 15 10.343 15 12C15 13.657 13.657 15 12 15C10.343 15 9 13.657 9 12C9 10.343 10.343 9 12 9Z" />
                                            </svg>
                                        )}
                                        {link.icon === 'tiktok' && (
                                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                            </svg>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
