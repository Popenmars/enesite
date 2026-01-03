'use client';

import React, { useState, useEffect } from 'react';
import { NavItem } from '@/types';
import styles from './Navbar.module.scss';

const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Hire Me', href: '#hire' },
];

export const Navbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navItems.map((item) => item.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <button
                    className={styles.logo}
                    onClick={() => scrollToSection('#home')}
                    aria-label="Scroll to top"
                >
                    <span className={styles.logoText}>Ene.tr</span>
                </button>

                {/* Desktop Navigation */}
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <button
                                onClick={() => scrollToSection(item.href)}
                                className={`${styles.navLink} ${activeSection === item.href.substring(1) ? styles.active : ''
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <button
                                onClick={() => scrollToSection(item.href)}
                                className={`${styles.mobileNavLink} ${activeSection === item.href.substring(1) ? styles.active : ''
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
