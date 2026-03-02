'use client';

import dynamic from 'next/dynamic';

const Antigravity = dynamic(
    () => import('@/components/Antigravity/Antigravity'),
    { ssr: false }
);

export default function AntigravityBackground() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                <Antigravity
                    count={300}
                    magnetRadius={10}
                    ringRadius={10}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={2}
                    lerpSpeed={0.1}
                    color="#FF9FFC"
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="capsule"
                    fieldStrength={10}
                />
            </div>
        </div>
    );
}
