'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

// Define the bounce-slow animation
const bounceSlow = {
    '@keyframes bounce-slow': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-25px)' }
    },
    'animation-bounce-slow': 'bounce-slow 3s infinite'
}

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
        <div className={`min-h-screen bg-gray-100 p-6 ${shakeScreen ? 'animate-shake' : ''}`}>
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-25px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>

            {isCorrect && (
                <>
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-10 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-xl shadow-2xl text-center animate-bounce-slow">
                            <h2 className="text-4xl font-bold text-green-600 mb-4">¡Correcto!</h2>
                            <p className="text-xl mb-6">Has encontrado y corregido todos los errores.</p>
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

            <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ${isCorrect ? 'blur-sm' : ''}`}>
                <div className="bg-gray-800 text-white p-4">
                    <h1 className="text-2xl font-bold">Python Debugging Challenge</h1>
                    <p className="text-gray-300">Encuentra y corrige los errores en el siguiente código Python</p>
                </div>

                <div className="p-6">
                    {hasError && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            ¡Todavía hay errores! Revisa el código nuevamente.
                        </div>
                    )}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Corrige el código (hay 2 errores):</h2>
                        <textarea
                            value={fixedCode}
                            onChange={(e) => {
                                setFixedCode(e.target.value);
                                setHasError(false);
                            }}
                            className="w-full h-64 p-3 border border-gray-300 rounded font-mono bg-gray-800 text-green-400"
                            placeholder="Corrige el código Python aquí..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={checkSolution}
                            className="bg-[#3b82f6] text-white px-6 py-2 rounded hover:bg-green-600"
                        >
                            Verificar solución
                        </button>

                        <button
                            onClick={resetChallenge}
                            className="bg-[#3b82f6] text-white px-6 py-2 rounded hover:bg-green-600"
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