'use client'

import React, { useState, useRef, useEffect } from 'react'
import Confetti from 'react-confetti'

// Estilos comunes para mayor compatibilidad
const commonStyles = {
    container: {
        backgroundColor: '#f3f4f6', // bg-gray-100
        padding: '1.5rem', // p-6
        minHeight: '100vh',
    },
    mainContainer: {
        maxWidth: '56rem', // max-w-4xl
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem', // rounded-lg
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#1f2937', // bg-gray-800
        color: 'white',
        padding: '1rem', // p-4
    },
    title: {
        fontSize: '1.5rem', // text-2xl
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#d1d5db', // text-gray-300
    },
    content: {
        padding: '1.5rem', // p-6
    },
    button: {
        backgroundColor: '#3b82f6', // bg-blue-500
        color: 'white',
        paddingLeft: '1.5rem', // px-6
        paddingRight: '1.5rem',
        paddingTop: '0.5rem', // py-2
        paddingBottom: '0.5rem',
        borderRadius: '0.25rem', // rounded
        cursor: 'pointer',
        border: 'none',
        fontWeight: '500',
    },
    buttonHover: {
        backgroundColor: '#2563eb', // hover:bg-blue-600
    },
    input: {
        border: '1px solid #d1d5db', // border-gray-300
        borderRadius: '0.25rem', // rounded
        padding: '0.5rem', // p-2
        width: '100%',
        maxWidth: '12rem', // max-w-xs
    },
    overlayStyle: {
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    congratsBox: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
        animation: 'bounce-slow 3s infinite',
    },
    congratsTitle: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
        color: '#059669',
        marginBottom: '1rem',
    },
    congratsText: {
        fontSize: '1.25rem',
        marginBottom: '1.5rem',
    },
    preBlock: {
        backgroundColor: '#1f2937', // bg-gray-800
        color: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        overflowX: 'auto',
        whiteSpace: 'pre',
        userSelect: 'text',
    }
};

export default function PyramidChallenge() {
    const [rows, setRows] = useState('');
    const [pyramid, setPyramid] = useState('');
    const [success, setSuccess] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const generatePyramid = () => {
        const numRows = parseInt(rows);
        if (isNaN(numRows) || numRows <= 0) {
            setPyramid('Por favor, ingresa un número válido mayor que cero.');
            return;
        }

        if (numRows > 50) {
            setPyramid('¡El número es demasiado grande! Intenta con un número menor a 50.');
            return;
        }

        let result = '';
        for (let i = 0; i < numRows; i++) {
            const stars = 2 * i + 1;
            const spaces = numRows - i - 1;
            result += ' '.repeat(spaces) + '*'.repeat(stars) + ' '.repeat(spaces) + '\n';
        }

        setPyramid(result);

        if (numRows >= 3) {
            setSuccess(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            generatePyramid();
        }
    };

    return (
        <div style={commonStyles.container}>
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }
            `}</style>

            <div
                style={{
                    ...commonStyles.mainContainer,
                }}
            >
                <div style={commonStyles.header}>
                    <h1 style={commonStyles.title}>Reto de Programación: Pirámide de Asteriscos</h1>
                    <p style={commonStyles.subtitle}>Genera una pirámide de asteriscos con el número de filas que especifiques</p>
                </div>

                <div style={commonStyles.content}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Instrucciones:</h2>
                        <p style={{ marginBottom: '0.75rem' }}>Escribe un programa que genere una pirámide de asteriscos (*) con el número de filas que el usuario especifique.</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
                            <li>El programa debe recibir como entrada un número entero positivo que representa el número de filas.</li>
                            <li>La primera fila tiene 1 asterisco, la segunda tiene 3, la tercera tiene 5, y así sucesivamente.</li>
                            <li>Cada fila debe estar centrada con respecto a la base de la pirámide.</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Ejemplo:</h2>
                        <p style={{ marginBottom: '0.5rem' }}>Para una pirámide de 5 filas:</p>
                        <pre style={commonStyles.preBlock}>
                            {'    *    \n' +
                                '   ***   \n' +
                                '  *****  \n' +
                                ' ******* \n' +
                                '*********'}
                        </pre>
                    </div>

                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Ejemplo de como debe ser el programa:</h2>
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <div>
                                <label htmlFor="rows" style={{ display: 'block', marginBottom: '0.5rem' }}>Número de filas:</label>
                                <input
                                    type="number"
                                    id="rows"
                                    value={rows}
                                    onChange={(e) => setRows(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    min="1"
                                    placeholder="Ingresa un número"
                                    style={commonStyles.input}
                                />
                            </div>
                            <button
                                onClick={generatePyramid}
                                style={commonStyles.button}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            >
                                Generar Pirámide
                            </button>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>Resultado:</h3>
                            <pre style={{ ...commonStyles.preBlock, minHeight: '10rem', maxHeight: '20rem', overflowY: 'auto' }}>
                                {pyramid || 'Aquí se mostrará tu pirámide...'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
