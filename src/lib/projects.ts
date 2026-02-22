// Project data from Niti Kanoongo's resume
export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    image?: string
    link?: string
    year: string
    problem: string
    nitiGptContext: string
}

export const projects: Project[] = [
    {
        id: 'bone-fracture',
        title: 'Bone Fracture Classification',
        description:
            'Built a deep learning system using ResNet18 and MONAI to classify 10 types of bone fractures from X-ray images, handling class imbalance through augmentation and weighted loss.',
        tags: ['Python', 'ResNet18', 'MONAI', 'Deep Learning', 'Medical AI'],
        year: '2024',
        problem: 'Automated fracture detection to improve diagnostic consistency and speed.',
        nitiGptContext:
            'This project taught me that medical AI isn\'t just about high accuracy—it\'s about handling the messiness of real clinical data. Class imbalance was brutal, but weighted loss functions became my best friend.',
    },
    {
        id: 'crane-dashboard',
        title: 'Dynamic Crane Dashboard',
        description:
            'Built an IoT-based predictive maintenance system using LSTM and SARIMA models with a real-time monitoring dashboard for early fault detection.',
        tags: ['IoT', 'LSTM', 'SARIMA', 'Time-Series', 'Dashboard'],
        year: '2024',
        problem: 'Reduced unplanned downtime by forecasting equipment failures using time-series data.',
        nitiGptContext:
            'Predictive maintenance sounds fancy until you realize sensors produce a LOT of noisy data. The real challenge was making sense of patterns that actually mattered for predicting failures.',
    },
    {
        id: 'phishguard',
        title: 'PhishGuard',
        description:
            'Developed a Chrome extension and web tool using supervised ML and REST APIs to detect phishing URLs in real time with high accuracy and low latency.',
        tags: ['Chrome Extension', 'ML', 'REST APIs', 'Cybersecurity', 'JavaScript'],
        year: '2024',
        problem: 'Enabled browser-level phishing protection without degrading user experience.',
        nitiGptContext:
            'Security tools that slow you down don\'t get used. The goal here was protection that feels invisible—ML running in the background while you browse normally.',
    },
    {
        id: 'aspirant-india',
        title: 'Aspirant India Website',
        description:
            'Owned end-to-end development and deployment of a production website for an education initiative, improving UI/UX and performance. Led a small development team.',
        tags: ['Web Development', 'UI/UX', 'Team Leadership', 'Production Deployment'],
        image: '/AspirantWebsite.png',
        year: '2025',
        problem: 'Translated organizational requirements into a polished, performant web experience.',
        nitiGptContext:
            'My first time leading a dev team on a real production site. The hardest part wasn\'t the code—it was aligning stakeholder expectations with technical constraints.',
    },
]
