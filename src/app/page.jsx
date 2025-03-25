'use client'

import { useState, useEffect } from 'react'

const HtmlPuzzle = () => {
  const [pieces, setPieces] = useState([
    { id: 'header', label: '<header>', correct: false },
    { id: 'nav', label: '<nav>', correct: false },
    { id: 'section', label: '<section>', correct: false },
    { id: 'article', label: '<article>', correct: false },
    { id: 'aside', label: '<aside>', correct: false },
    { id: 'footer', label: '<footer>', correct: false },
  ])

  const [placedPieces, setPlacedPieces] = useState({})
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleDragStart = (e, piece, fromArea = null) => {
    setDraggedPiece({ ...piece, fromArea })
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    if (draggedPiece) {
      // Si la pieza viene de otra área y se arrastra a la zona de piezas disponibles
      if (draggedPiece.fromArea && targetId === 'available') {
        setPlacedPieces(prev => {
          const newPlaced = { ...prev }
          delete newPlaced[draggedPiece.fromArea]
          return newPlaced
        })
      }
      // Si la pieza viene de otra área y se arrastra a otra área del puzzle
      else if (draggedPiece.fromArea) {
        setPlacedPieces(prev => {
          const newPlaced = { ...prev }
          delete newPlaced[draggedPiece.fromArea]
          return {
            ...newPlaced,
            [targetId]: draggedPiece
          }
        })
      }
      // Si viene del panel de piezas disponibles y no se suelta en el mismo panel
      else if (targetId !== 'available') {
        setPlacedPieces(prev => ({
          ...prev,
          [targetId]: draggedPiece
        }))
      }
      // Si se arrastra desde disponibles y se suelta en disponibles, no hacemos nada

      // Ocultar mensajes cuando se hace un cambio
      setShowMessage(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Verificar si todas las piezas están en el lugar correcto
  const checkPuzzle = () => {
    // Comprobar si cada área tiene la pieza correcta (id de la pieza === id del área)
    const isCorrect = Object.entries(placedPieces).every(
      ([areaId, piece]) => piece.id === areaId
    );

    setIsComplete(isCorrect);
    setHasError(!isCorrect);
    setShowMessage(true);
  }

  // Renderizar una pieza colocada en una zona
  const renderPlacedPiece = (areaId, height, bgColor) => {
    const piece = placedPieces[areaId]
    return (
      <div
        onDrop={(e) => handleDrop(e, areaId)}
        onDragOver={handleDragOver}
        className={`${height} rounded ${piece ? bgColor : 'bg-gray-200'} flex items-center justify-center text-sm`}
      >
        {piece ? (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, piece, areaId)}
            className="w-full h-full flex items-center justify-center cursor-move"
          >
            {piece.label}
          </div>
        ) : '?'}
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-100 p-2">
      <div className="h-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          HTML Semántico Puzzle
        </h1>

        {showMessage && (
          isComplete ? (
            <div className="text-center p-2 bg-green-100 rounded-lg mb-2">
              <p className="text-green-700">¡Felicitaciones! Has completado el puzzle correctamente.</p>
            </div>
          ) : hasError ? (
            <div className="text-center p-2 bg-red-100 rounded-lg mb-2">
              <p className="text-red-700">Hay un error en tu solución. Revisa la posición de los elementos HTML.</p>
            </div>
          ) : null
        )}

        {!showMessage && (
          <div className="text-center p-2 bg-blue-100 rounded-lg mb-2">
            <p className="text-blue-700 text-sm">Arrastra cada elemento a su posición correcta.</p>
          </div>
        )}

        <div className="flex gap-4 h-[calc(100%-10rem)]">
          {/* Panel izquierdo con piezas arrastrables */}
          <div
            className="w-48 bg-white p-4 rounded-lg shadow-lg"
            onDrop={(e) => handleDrop(e, 'available')}
            onDragOver={handleDragOver}
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Piezas disponibles</h2>
            <div className="space-y-2">
              {pieces.filter(piece => !Object.values(placedPieces).some(placed => placed.id === piece.id)).map(piece => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece)}
                  className="bg-white px-3 py-1 rounded shadow cursor-move hover:bg-gray-50 transition-colors text-sm"
                >
                  {piece.label}
                </div>
              ))}
            </div>
          </div>

          {/* Panel derecho con el puzzle */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <div className="grid gap-2 flex-grow" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
              {/* Header */}
              {renderPlacedPiece('header', 'h-12', 'bg-blue-100')}

              {/* Nav */}
              {renderPlacedPiece('nav', 'h-10', 'bg-pink-100')}

              {/* Main content */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  {/* Section */}
                  {renderPlacedPiece('section', 'h-28', 'bg-green-100')}

                  {/* Article */}
                  {renderPlacedPiece('article', 'h-28', 'bg-purple-100')}
                </div>

                {/* Aside */}
                {renderPlacedPiece('aside', 'h-full', 'bg-yellow-100')}
              </div>

              {/* Footer */}
              {renderPlacedPiece('footer', 'h-12', 'bg-green-50')}
            </div>

            {/* Botón de calificación */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={checkPuzzle}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Calificar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlPuzzle
