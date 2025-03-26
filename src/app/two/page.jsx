'use client'

import { useState, useEffect } from 'react'
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
    errorMessage: {
        marginBottom: '1rem', // mb-4
        padding: '0.75rem', // p-3
        backgroundColor: '#fee2e2', // bg-red-100
        color: '#b91c1c', // text-red-700
        borderRadius: '0.5rem', // rounded-lg
    },
    sectionTitle: {
        fontSize: '1.25rem', // text-xl
        fontWeight: '600', // font-semibold
        marginBottom: '1rem', // mb-4
    },
    codeTextarea: {
        width: '100%',
        height: '16rem', // h-64
        padding: '0.75rem', // p-3
        border: '1px solid #d1d5db', // border border-gray-300
        borderRadius: '0.25rem', // rounded
        fontFamily: 'monospace',
        backgroundColor: '#1f2937', // bg-gray-800
        color: '#34d399', // text-green-400
    },
    buttonContainer: {
        display: 'flex',
        gap: '1rem', // gap-4
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
    },
    buttonHover: {
        backgroundColor: '#2563eb', // hover:bg-blue-600
    },
    shakeAnimation: {
        animation: 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
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
    }
};

// Estilo para la animación de vibración
const shakeAnimation = {
    animation: 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
};

const DebuggingChallenge = () => {
    // Estado para controlar el juego
    const [code, setCode] = useState(`def calcular_promedio(numeros):
    suma = 0
    for i in range(len(numeros) + 1):
        suma += numeros[i]
    return suma / len(numeros)

# Ejemplo de uso
resultado = calcular_promedio((10, 20, 30, 40))
print(resultado)`)

    const [fixedCode, setFixedCode] = useState(`def calcular_promedio(numeros):
    suma = 0
    for i in range(len(numeros) + 1):
        suma += numeros[i]
    return suma / len(numeros)

# Ejemplo de uso
resultado = calcular_promedio((10, 20, 30, 40))
print(resultado)`)
    const [isCorrect, setIsCorrect] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [hasError, setHasError] = useState(false)
    const [shakeScreen, setShakeScreen] = useState(false)

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

    // Efecto para controlar la animación de vibración
    useEffect(() => {
        if (hasError) {
            // Activar animación de vibración
            setShakeScreen(true)

            // Desactivar la animación después de que termine
            const timer = setTimeout(() => {
                setShakeScreen(false)
            }, 800) // Vibración de 800ms

            return () => clearTimeout(timer)
        }
    }, [hasError])

    const checkSolution = () => {
        // Solución correcta esperada
        const correctSolution = `def calcular_promedio(numeros):
    suma = 0
    for i in range(len(numeros)):
        suma += numeros[i]
    return suma / len(numeros)

# Ejemplo de uso
resultado = calcular_promedio([10, 20, 30, 40])
print(resultado)`

        // Normalizamos el código para comparar (eliminamos espacios en blanco y saltos de línea)
        const normalizedFixed = fixedCode.replace(/\s+/g, '')
        const normalizedCorrect = correctSolution.replace(/\s+/g, '')

        if (normalizedFixed === normalizedCorrect) {
            setIsCorrect(true)
        } else {
            setHasError(true)
        }
    }

    const resetChallenge = () => {
        setFixedCode(`def calcular_promedio(numeros):
    suma = 0
    for i in range(len(numeros) + 1):
        suma += numeros[i]
    return suma / len(numeros)

# Ejemplo de uso
resultado = calcular_promedio((10, 20, 30, 40))
print(resultado)`)
        setIsCorrect(false)
        setHasError(false)
    }

    return (
        <div
            style={{
                ...commonStyles.container,
                ...(shakeScreen ? shakeAnimation : {})
            }}
        >
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `}</style>

            {isCorrect && (
                <>
                    <div style={commonStyles.overlayStyle}>
                        <div style={commonStyles.congratsBox}>
                            <h2 style={commonStyles.congratsTitle}>¡Correcto!</h2>
                            <p style={commonStyles.congratsText}>Has encontrado y corregido todos los errores.</p>
                        </div>
                    </div>
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.15}
                        style={{ position: 'fixed', top: 0, left: 0, zIndex: 20 }}
                    />
                </>
            )}

            <div
                style={{
                    ...commonStyles.mainContainer,
                    filter: isCorrect ? 'blur(4px)' : 'none',
                }}
            >
                <div style={commonStyles.header}>
                    <h1 style={commonStyles.title}>Python Debugging Challenge</h1>
                    <p style={commonStyles.subtitle}>Encuentra y corrige los errores en el siguiente código Python</p>
                </div>

                <div style={commonStyles.content}>
                    {hasError && (
                        <div style={commonStyles.errorMessage}>
                            ¡Todavía hay errores! Revisa el código nuevamente.
                        </div>
                    )}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={commonStyles.sectionTitle}>Corrige el código (hay 2 errores):</h2>
                        <textarea
                            value={fixedCode}
                            onChange={(e) => {
                                setFixedCode(e.target.value);
                                setHasError(false);
                            }}
                            style={commonStyles.codeTextarea}
                            placeholder="Corrige el código Python aquí..."
                        />
                    </div>

                    <div style={commonStyles.buttonContainer}>
                        <button
                            onClick={checkSolution}
                            style={commonStyles.button}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                            Verificar solución
                        </button>

                        <button
                            onClick={resetChallenge}
                            style={commonStyles.button}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebuggingChallenge