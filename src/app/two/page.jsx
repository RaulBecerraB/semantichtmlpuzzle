'use client'

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

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

    const [fixedCode, setFixedCode] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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
            alert('¡Todavía hay errores! Revisa el código nuevamente.')
        }
    }

    const resetChallenge = () => {
        setFixedCode('')
        setIsCorrect(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {isCorrect && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-bounce">
                            <h2 className="text-3xl font-bold text-green-600 mb-4">¡Correcto!</h2>
                            <p className="text-xl mb-6">Has encontrado y corregido todos los errores.</p>
                        </div>
                    </div>
                    <Confetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                    />
                </>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-800 text-white p-4">
                    <h1 className="text-2xl font-bold">Python Debugging Challenge</h1>
                    <p className="text-gray-300">Encuentra y corrige los errores en el siguiente código Python</p>
                </div>

                <div className="p-6">
                    <div className="mb-6 bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                        <pre>{code}</pre>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Tu solución:</h2>
                        <textarea
                            value={fixedCode}
                            onChange={(e) => setFixedCode(e.target.value)}
                            className="w-full h-64 p-3 border border-gray-300 rounded font-mono"
                            placeholder="Escribe aquí el código Python corregido..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={checkSolution}
                            className="bg-[#3b82f6] text-white px-6 py-2 rounded hover:bg-green-600"
                        >
                            Verificar solución
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebuggingChallenge