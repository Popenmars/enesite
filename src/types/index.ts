export interface NavItem {
    label: string;
    href: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    link?: string;
    embedUrl?: string;
    imageUrl?: string;
    releaseDate?: string;
    platform?: "All Platforms" | "Unreleased" | "Beats" ;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}
