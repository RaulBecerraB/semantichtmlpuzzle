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

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece)
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    if (draggedPiece) {
      setPlacedPieces(prev => ({
        ...prev,
        [targetId]: draggedPiece
      }))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    setIsComplete(pieces.every(piece => piece.correct))
  }, [pieces])

  return (
    <div className="h-screen bg-gray-100 p-2">
      <div className="h-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          HTML Semántico Puzzle
        </h1>

        {isComplete ? (
          <div className="text-center p-2 bg-green-100 rounded-lg mb-2">
            <p className="text-green-700">¡Felicitaciones! Has completado el puzzle correctamente.</p>
          </div>
        ) : (
          <div className="text-center p-2 bg-blue-100 rounded-lg mb-2">
            <p className="text-blue-700 text-sm">Arrastra cada elemento a su posición correcta.</p>
          </div>
        )}

        <div className="flex gap-4 h-[calc(100%-8rem)]">
          {/* Panel izquierdo con piezas arrastrables */}
          <div className="w-48 bg-white p-4 rounded-lg shadow-lg">
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
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <div className="grid gap-2 h-full" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
              {/* Header */}
              <div
                onDrop={(e) => handleDrop(e, 'header')}
                onDragOver={handleDragOver}
                className={`h-12 rounded ${placedPieces['header']
                  ? 'bg-blue-100'
                  : 'bg-gray-200'
                  } flex items-center justify-center text-sm`}
              >
                {placedPieces['header'] ? placedPieces['header'].label : '?'}
              </div>

              {/* Nav */}
              <div
                onDrop={(e) => handleDrop(e, 'nav')}
                onDragOver={handleDragOver}
                className={`h-10 rounded ${placedPieces['nav']
                  ? 'bg-pink-100'
                  : 'bg-gray-200'
                  } flex items-center justify-center text-sm`}
              >
                {placedPieces['nav'] ? placedPieces['nav'].label : '?'}
              </div>

              {/* Main content */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  {/* Section */}
                  <div
                    onDrop={(e) => handleDrop(e, 'section')}
                    onDragOver={handleDragOver}
                    className={`h-28 rounded ${placedPieces['section']
                      ? 'bg-green-100'
                      : 'bg-gray-200'
                      } flex items-center justify-center text-sm`}
                  >
                    {placedPieces['section'] ? placedPieces['section'].label : '?'}
                  </div>

                  {/* Article */}
                  <div
                    onDrop={(e) => handleDrop(e, 'article')}
                    onDragOver={handleDragOver}
                    className={`h-28 rounded ${placedPieces['article']
                      ? 'bg-purple-100'
                      : 'bg-gray-200'
                      } flex items-center justify-center text-sm`}
                  >
                    {placedPieces['article'] ? placedPieces['article'].label : '?'}
                  </div>
                </div>

                {/* Aside */}
                <div
                  onDrop={(e) => handleDrop(e, 'aside')}
                  onDragOver={handleDragOver}
                  className={`rounded ${placedPieces['aside']
                    ? 'bg-yellow-100'
                    : 'bg-gray-200'
                    } flex items-center justify-center text-sm`}
                >
                  {placedPieces['aside'] ? placedPieces['aside'].label : '?'}
                </div>
              </div>

              {/* Footer */}
              <div
                onDrop={(e) => handleDrop(e, 'footer')}
                onDragOver={handleDragOver}
                className={`h-12 rounded ${placedPieces['footer']
                  ? 'bg-green-50'
                  : 'bg-gray-200'
                  } flex items-center justify-center text-sm`}
              >
                {placedPieces['footer'] ? placedPieces['footer'].label : '?'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlPuzzle
