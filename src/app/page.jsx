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

  const [draggedPiece, setDraggedPiece] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece)
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    if (draggedPiece.id === targetId) {
      setPieces(pieces.map(p =>
        p.id === targetId ? { ...p, correct: true } : p
      ))
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    setIsComplete(pieces.every(piece => piece.correct))
  }, [pieces])

  return (
    <div className="h-screen bg-gray-100 p-4">
      <div className="h-full max-w-3xl mx-auto flex flex-col">
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

        <div className="flex gap-2 mb-2 flex-wrap justify-center">
          {pieces.filter(p => !p.correct).map(piece => (
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

        <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
          <div className="grid gap-2 h-full" style={{ gridTemplateRows: 'auto auto 1fr auto' }}>
            {/* Header */}
            <div
              onDrop={(e) => handleDrop(e, 'header')}
              onDragOver={handleDragOver}
              className={`h-12 rounded ${pieces.find(p => p.id === 'header')?.correct
                ? 'bg-blue-200'
                : 'bg-gray-200'
                } flex items-center justify-center text-sm`}
            >
              {pieces.find(p => p.id === 'header')?.correct ? '<header>' : '?'}
            </div>

            {/* Nav */}
            <div
              onDrop={(e) => handleDrop(e, 'nav')}
              onDragOver={handleDragOver}
              className={`h-10 rounded ${pieces.find(p => p.id === 'nav')?.correct
                ? 'bg-pink-200'
                : 'bg-gray-200'
                } flex items-center justify-center text-sm`}
            >
              {pieces.find(p => p.id === 'nav')?.correct ? '<nav>' : '?'}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                {/* Section */}
                <div
                  onDrop={(e) => handleDrop(e, 'section')}
                  onDragOver={handleDragOver}
                  className={`h-24 rounded ${pieces.find(p => p.id === 'section')?.correct
                    ? 'bg-green-200'
                    : 'bg-gray-200'
                    } flex items-center justify-center text-sm`}
                >
                  {pieces.find(p => p.id === 'section')?.correct ? '<section>' : '?'}
                </div>

                {/* Article */}
                <div
                  onDrop={(e) => handleDrop(e, 'article')}
                  onDragOver={handleDragOver}
                  className={`h-24 rounded ${pieces.find(p => p.id === 'article')?.correct
                    ? 'bg-purple-200'
                    : 'bg-gray-200'
                    } flex items-center justify-center text-sm`}
                >
                  {pieces.find(p => p.id === 'article')?.correct ? '<article>' : '?'}
                </div>
              </div>

              {/* Aside */}
              <div
                onDrop={(e) => handleDrop(e, 'aside')}
                onDragOver={handleDragOver}
                className={`rounded ${pieces.find(p => p.id === 'aside')?.correct
                  ? 'bg-yellow-200'
                  : 'bg-gray-200'
                  } flex items-center justify-center text-sm`}
              >
                {pieces.find(p => p.id === 'aside')?.correct ? '<aside>' : '?'}
              </div>
            </div>

            {/* Footer */}
            <div
              onDrop={(e) => handleDrop(e, 'footer')}
              onDragOver={handleDragOver}
              className={`h-12 rounded ${pieces.find(p => p.id === 'footer')?.correct
                ? 'bg-green-100'
                : 'bg-gray-200'
                } flex items-center justify-center text-sm`}
            >
              {pieces.find(p => p.id === 'footer')?.correct ? '<footer>' : '?'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlPuzzle
