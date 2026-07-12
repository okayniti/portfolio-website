// Project data from Niti Kanoongo's resume
export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    category: string
    image?: string
    link?: string
    year: string
    problem: string
}

export const projects: Project[] = [
    {
        id: 'sangamdrishti',
        title: 'SangamDrishti — Real-Time Emergency Command & Control System',
        description:
            'Architected real-time crowd telemetry for Mahakumbh-scale events; engineered a persistent WebSocket pipeline (Socket.io) emitting live sector density and responder coordinates every 4s across 10+ concurrent zones. Implemented geometric proximity dispatch algorithm computing live distance across all active responders, surfacing top 3 nearest units for single-click deployment, eliminating human triage latency under crisis conditions. Built RAG-powered AI advisor (Gemini 2.0 Flash) grounded in 6 embedded SOPs with live telemetry injected per prompt; designed stateless backend with in-memory indexing; deployed to Vercel + Render.',
        tags: ['React', 'Node.js', 'Express.js', 'Socket.io', 'RAG', 'Gemini 2.0 Flash', 'System Design'],
        category: 'Real-Time Streaming & AI Systems',
        year: '2026',
        problem: 'Eliminated human triage latency and enabled instant situational awareness under crisis conditions.',
        link: 'https://github.com/okayniti',
    },
    {
        id: 'aurora',
        title: 'Aurora — AI Productivity Dashboard',
        description:
            'Designed modular full-stack system with async FastAPI backend and stateless workers for horizontal scalability; real-time inference endpoints with 60s prediction caching reduce redundant compute across concurrent users. Built LSTM and XGBoost models for burnout detection and energy-level forecasting; integrated SHAP explainability; applied RL for adaptive task scheduling; used transformer embeddings for semantic task alignment. Optimized first-load JS bundle to 105 KB via code-splitting and lazy loading; implemented JWT authentication with modular API design and version-controlled training workflows for reproducible model iteration.',
        tags: ['Next.js 14', 'FastAPI', 'PyTorch', 'XGBoost', 'PostgreSQL', 'Docker', 'SHAP', 'Reinforcement Learning'],
        category: 'Full-Stack ML Systems',
        year: '2026',
        problem: 'Optimized bundle sizes to 105 KB and minimized server-side compute overhead for real-time model inference.',
        link: 'https://github.com/okayniti',
    },
    {
        id: 'vocasense',
        title: 'VocaSense Kids — AI Vocal Emotion Analyzer',
        description:
            'Designed and built an AI-powered emotional intelligence tool for children that analyzes vocal patterns—tone, pitch, and energy—to detect underlying emotions. Engineered custom feature extraction scripts using Librosa to calculate Mel-frequency cepstral coefficients (MFCCs) and Root Mean Square (RMS) energy. Designed robust silence detection and a positivity bias calibration algorithm to prevent false positives from kids\' natural high pitches. Built the backend using Flask and Scikit-learn Random Forest model, and designed a kid-friendly responsive interface.',
        tags: ['Python', 'Flask', 'Librosa', 'Scikit-learn', 'Random Forest', 'HTML5/CSS3', 'Vanilla JS'],
        category: 'AI/ML & Audio DSP',
        year: '2025',
        problem: 'Correcting sentiment analysis models to accurately interpret the high pitch and energy variations of children\'s vocal patterns while filtering background noise.',
        link: 'https://github.com/okayniti/VocaSense',
    },
]
