import React, { useCallback } from 'react'
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const ParticlesComponent = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {

    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{

                fpsLimit: 120,
                interactivity: {
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#000000",
                    },
                    links: {
                        color: "#000000",
                        distance: 150,
                        enable: true,
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 700,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "path",
                        options: {
                            path: {
                                data: "M5 2.5A2.5 2.5 0 1 1 0 2.5A2.5 2.5 0 0 1 5 2.5ZM5 0.5L8 3.5M5 0.5L2 3.5M5 4.5L8 7.5M5 4.5L2 7.5",
                                fillRule: "evenodd"
                            }
                        }
                    },
                    size: {
                        value: { min: 10, max: 20 },
                    },
                },
                detectRetina: true,
            }}
        />
    )
}
