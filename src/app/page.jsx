'use client'

import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import CheckButton from './components/CheckButton'

// Estilos para evitar la selección de texto durante el arrastre
const noSelectStyle = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
}

// Estilo para la animación de vibración
const shakeAnimation = {
  animation: 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
}

// Estilos comunes para mayor compatibilidad
const commonStyles = {
  container: {
    backgroundColor: '#f3f4f6', // bg-gray-100
    padding: '0.5rem', // p-2
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  mainContainer: {
    maxWidth: '56rem', // max-w-4xl
    margin: '0 auto',
    paddingBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem', // text-2xl
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827', // text-gray-900
    marginBottom: '0.5rem', // mb-2
  },
  messageBox: {
    textAlign: 'center',
    padding: '0.5rem', // p-2
    borderRadius: '0.5rem', // rounded-lg
    marginBottom: '0.5rem', // mb-2
  },
  flexContainer: {
    display: 'flex',
    gap: '1rem', // gap-4
    marginTop: '1rem',
  },
  panel: {
    backgroundColor: 'white', // bg-white
    padding: '1rem', // p-4
    borderRadius: '0.5rem', // rounded-lg
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // shadow-lg
    display: 'flex',
    flexDirection: 'column',
  },
  panelTitle: {
    fontSize: '0.875rem', // text-sm
    fontWeight: '600', // font-semibold
    color: '#374151', // text-gray-700
    marginBottom: '0.5rem', // mb-2
  },
  piecesList: {
    marginBottom: '1rem', // mb-4
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem', // space-y-2
  },
  pieceItem: {
    backgroundColor: 'white', // bg-white
    paddingLeft: '0.75rem', // px-3
    paddingRight: '0.75rem',
    paddingTop: '0.25rem', // py-1
    paddingBottom: '0.25rem',
    borderRadius: '0.25rem', // rounded
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // shadow
    cursor: 'move', // cursor-move
    transition: 'background-color 0.2s', // transition-colors
    fontSize: '0.875rem', // text-sm
  },
  pieceItemHover: {
    backgroundColor: '#f9fafb', // hover:bg-gray-50
  },
  overlayStyle: {
    position: 'fixed', // Cambiar a fixed
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backdropFilter: 'blur(4px)', // backdrop-blur-sm
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // bg-black/30
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsBox: {
    backgroundColor: 'white',
    borderRadius: '0.75rem', // rounded-xl
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
    padding: '2rem', // p-8
    textAlign: 'center',
    maxWidth: '28rem', // max-w-md
    margin: '0 auto',
    animation: 'bounce-slow 3s infinite',
  },
  congratsTitle: {
    fontSize: '2.25rem', // text-4xl
    fontWeight: 'bold',
    color: '#059669', // text-green-600
    marginBottom: '1rem', // mb-4
  },
  congratsText: {
    fontSize: '1.25rem', // text-xl
    color: '#374151', // text-gray-700
  }
}

const HtmlPuzzle = () => {
  const [pieces, setPieces] = useState([
    { id: 'header', label: '<header>', correct: false, color: '#dbeafe' }, // bg-blue-100
    { id: 'nav', label: '<nav>', correct: false, color: '#fce7f3' }, // bg-pink-100
    { id: 'section', label: '<section>', correct: false, color: '#d1fae5' }, // bg-green-100
    { id: 'aside', label: '<aside>', correct: false, color: '#fee2e2' }, // bg-red-100
    { id: 'footer', label: '<footer>', correct: false, color: '#f0fdf4' }, // bg-green-50
  ])

  const [placedPieces, setPlacedPieces] = useState({})
  const [nestedPieces, setNestedPieces] = useState({}) // Para piezas anidadas dentro de otras
  const [draggedPiece, setDraggedPiece] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [shakeScreen, setShakeScreen] = useState(false) // Estado para controlar la vibración
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  })

  // Referencias para manejo de touch events
  const touchDragRef = useRef({
    isDragging: false,
    currentPiece: null,
    fromArea: null,
    startX: 0,
    startY: 0,
    currentTarget: null,
    dropTarget: null
  })
  const elementsRef = useRef({})

  // Inicialización segura para las dimensiones de ventana
  useEffect(() => {
    // Función para obtener las dimensiones actuales
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    // Actualizar las dimensiones inmediatamente
    updateDimensions()

    // Configurar evento de resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Efecto para controlar la animación de vibración
  useEffect(() => {
    if (hasError) {
      // Activar animación de vibración
      setShakeScreen(true)

      // Desactivar la animación después de que termine
      const timer = setTimeout(() => {
        setShakeScreen(false)
      }, 800) // Aumentamos a 800ms para una vibración más larga

      return () => clearTimeout(timer)
    }
  }, [hasError])

  // Aplicar overflow:hidden a html y body cuando el componente se monte
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Guardar los estilos originales
      const originalHTMLStyle = document.documentElement.style.overflow;
      const originalBodyStyle = document.body.style.overflow;

      // Aplicar overflow:hidden
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      // Restaurar los estilos originales cuando el componente se desmonte
      return () => {
        document.documentElement.style.overflow = originalHTMLStyle;
        document.body.style.overflow = originalBodyStyle;
      };
    }
  }, []);

  // Eventos de arrastre para escritorio
  const handleDragStart = (e, piece, fromArea = null) => {
    setDraggedPiece({ ...piece, fromArea })
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    processDrop(targetId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Función para procesar la caída (común para ambos desktop/mobile)
  const processDrop = (targetId) => {
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
      setDraggedPiece(null)
    }
  }

  // Eventos táctiles para móviles
  const handleTouchStart = (e, piece, fromArea = null) => {
    // Prevenir el comportamiento de scroll nativo durante el arrastre
    e.preventDefault()

    const touch = e.touches[0]
    const target = e.currentTarget

    // Guardar información del elemento que se está arrastrando
    touchDragRef.current = {
      isDragging: true,
      currentPiece: piece,
      fromArea: fromArea,
      startX: touch.clientX,
      startY: touch.clientY,
      currentTarget: target,
      dropTarget: null
    }

    // Aplicar estilos para indicar que se está arrastrando
    target.style.opacity = '0.6'
    target.style.zIndex = '1000'

    // Actualizar estado para mantener coherencia con la versión de escritorio
    setDraggedPiece({ ...piece, fromArea })
  }

  const handleTouchMove = (e) => {
    if (!touchDragRef.current.isDragging) return

    const touch = e.touches[0]
    const { currentTarget, startX, startY } = touchDragRef.current

    // Calcular el desplazamiento
    const offsetX = touch.clientX - startX
    const offsetY = touch.clientY - startY

    // Si estamos arrastrando un elemento, moverlo con el dedo
    if (currentTarget) {
      currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    }

    // Detectar área donde se está moviendo el dedo
    const elementsUnderTouch = document.elementsFromPoint(touch.clientX, touch.clientY)

    // Buscar el área de destino entre los elementos bajo el dedo
    const dropArea = elementsUnderTouch.find(el =>
      el.getAttribute('data-drop-area') !== null
    )

    // Actualizar área de destino actual
    if (dropArea) {
      touchDragRef.current.dropTarget = dropArea.getAttribute('data-drop-area')
    } else {
      touchDragRef.current.dropTarget = null
    }
  }

  const handleTouchEnd = (e) => {
    if (!touchDragRef.current.isDragging) return

    const { currentTarget, dropTarget } = touchDragRef.current

    // Restaurar estilos del elemento arrastrado
    if (currentTarget) {
      currentTarget.style.opacity = '1'
      currentTarget.style.transform = 'translate(0, 0)'
      currentTarget.style.zIndex = 'auto'
    }

    // Procesar el drop si tenemos un área de destino válida
    if (dropTarget) {
      processDrop(dropTarget)
    }

    // Reiniciar el estado de arrastre
    touchDragRef.current = {
      isDragging: false,
      currentPiece: null,
      fromArea: null,
      startX: 0,
      startY: 0,
      currentTarget: null,
      dropTarget: null
    }
  }

  // Verificar si todas las piezas están en el lugar correcto
  const checkPuzzle = () => {
    // Verificamos que todas las áreas tengan una pieza
    const allAreasHavePieces = ['header', 'nav', 'section', 'aside', 'footer']
      .every(area => area in placedPieces);

    // Verificamos que todas las piezas estén en su lugar correcto
    const allPiecesCorrect = Object.entries(placedPieces).every(
      ([areaId, piece]) => piece.id === areaId
    );

    // Solo está completo si todas las áreas tienen piezas Y todas están correctas
    const isCorrect = allAreasHavePieces && allPiecesCorrect;

    setIsComplete(isCorrect);
    setHasError(!isCorrect);
    setShowMessage(true);

    // Si hay error, asegurarnos de que la vibración sea notoria
    if (!isCorrect) {
      // Activar vibración mediante CSS y también usando el estado
      setShakeScreen(true);

      // Usar try-catch para evitar errores si el elemento no existe
      try {
        const screenElement = document.querySelector('.h-screen');
        if (screenElement) {
          screenElement.classList.add('animate-shake');
        }
      } catch (e) {
        console.error("Error al añadir animación", e);
      }

      setTimeout(() => {
        setShakeScreen(false);

        try {
          const screenElement = document.querySelector('.h-screen');
          if (screenElement) {
            screenElement.classList.remove('animate-shake');
          }
        } catch (e) {
          console.error("Error al remover animación", e);
        }
      }, 800);
    }
  }

  // Definimos los colores de fondo para las diferentes áreas
  const getAreaBgColor = (areaId) => {
    const piece = placedPieces[areaId];
    return piece ? piece.color : '#e5e7eb'; // Default: bg-gray-200
  };

  // Renderizar una pieza colocada en una zona
  const renderPlacedPiece = (areaId, height, bgColor) => {
    const piece = placedPieces[areaId]
    const areaStyle = {
      height: height,
      backgroundColor: getAreaBgColor(areaId),
      borderRadius: '0.25rem', // rounded
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.875rem', // text-sm
      ...noSelectStyle
    }

    const pieceStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'move', // cursor-move
      ...noSelectStyle
    }

    return (
      <div
        data-drop-area={areaId}
        onDrop={(e) => handleDrop(e, areaId)}
        onDragOver={handleDragOver}
        className={`${height} rounded ${piece ? bgColor : 'bg-gray-200'} flex items-center justify-center text-sm`}
        style={areaStyle}
        ref={el => elementsRef.current[`drop_${areaId}`] = el}
      >
        {piece ? (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, piece, areaId)}
            onTouchStart={(e) => handleTouchStart(e, piece, areaId)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full flex items-center justify-center cursor-move"
            style={pieceStyle}
            ref={el => elementsRef.current[`piece_${piece.id}_${areaId}`] = el}
          >
            {piece.label}
          </div>
        ) : '?'}
      </div>
    )
  }

  // Variables para especificar las alturas de forma consistente
  const heights = {
    h12: '4rem', // Increased from 3rem
    h10: '3.5rem', // Increased from 2.5rem
    h28: '14rem', // Increased from 7rem
    hFull: '100%', // h-full
  };

  return (
    <div
      className="bg-gray-100 p-2"
      style={{
        ...noSelectStyle,
        ...(shakeScreen ? shakeAnimation : {}),
        ...commonStyles.container,
        overflow: 'hidden'
      }}
    >
      {isComplete && (
        <>
          {/* Overlay borroso con mensaje de felicitación */}
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-10 flex items-center justify-center"
            style={commonStyles.overlayStyle}>
            <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-bounce-slow"
              style={commonStyles.congratsBox}>
              <h2 className="text-4xl font-bold text-green-600 mb-4"
                style={commonStyles.congratsTitle}>¡FELICIDADES!</h2>
              <p className="text-xl text-gray-700"
                style={commonStyles.congratsText}>Has completado correctamente el puzzle de HTML Semántico</p>
            </div>
          </div>

          {/* Confetti por encima del overlay */}
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 20 }}
          />
        </>
      )}
      <div
        className={`max-w-4xl mx-auto ${isComplete ? 'blur-sm' : ''}`}
        style={{
          ...commonStyles.mainContainer,
          filter: isComplete ? 'blur(4px)' : 'none',
        }}
      >
        <h1
          className="text-2xl font-bold text-center text-gray-900 mb-2"
          style={commonStyles.title}
        >
          HTML Semántico Puzzle
        </h1>

        {showMessage && (
          isComplete ? (
            <div
              className="text-center p-2 bg-green-100 rounded-lg mb-2"
              style={{
                ...commonStyles.messageBox,
                backgroundColor: '#d1fae5', // bg-green-100
              }}
            >
              <p className="text-green-700"
                style={{ color: '#047857' }}>¡Felicitaciones! Has completado el puzzle correctamente.</p>
            </div>
          ) : hasError ? (
            <div
              className="text-center p-2 bg-red-100 rounded-lg mb-2"
              style={{
                ...commonStyles.messageBox,
                backgroundColor: '#fee2e2', // bg-red-100
              }}
            >
              <p className="text-red-700"
                style={{ color: '#b91c1c' }}>Hay un error en tu solución. Revisa la posición de los elementos HTML.</p>
            </div>
          ) : null
        )}

        {!showMessage && (
          <div
            className="text-center p-2 bg-blue-100 rounded-lg mb-2"
            style={{
              ...commonStyles.messageBox,
              backgroundColor: '#dbeafe', // bg-blue-100
            }}
          >
            <p className="text-blue-700 text-sm"
              style={{ color: '#1d4ed8', fontSize: '0.875rem' }}>Arrastra cada elemento a su posición correcta.</p>
          </div>
        )}

        <div
          className="flex gap-4"
          style={commonStyles.flexContainer}
        >
          {/* Panel izquierdo con piezas arrastrables */}
          <div
            className="w-48 bg-white p-4 rounded-lg shadow-lg flex flex-col"
            style={{
              ...commonStyles.panel,
              width: '12rem', // w-48
              minHeight: '28rem', // Added minHeight for better vertical spacing
            }}
            data-drop-area="available"
            onDrop={(e) => handleDrop(e, 'available')}
            onDragOver={handleDragOver}
            ref={el => elementsRef.current['drop_available'] = el}
          >
            <h2
              className="text-sm font-semibold text-gray-700 mb-2"
              style={commonStyles.panelTitle}
            >Piezas disponibles</h2>
            <div
              className="space-y-2 mb-4 flex-grow overflow-y-auto"
              style={commonStyles.piecesList}
            >
              {pieces.filter(piece => !Object.values(placedPieces).some(placed => placed.id === piece.id)).map(piece => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece)}
                  onTouchStart={(e) => handleTouchStart(e, piece)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="bg-white px-3 py-1 rounded shadow cursor-move hover:bg-gray-50 transition-colors text-sm"
                  style={{
                    ...commonStyles.pieceItem,
                    backgroundColor: piece.color,
                    color: '#374151' // text-gray-700
                  }}
                  ref={el => elementsRef.current[`piece_${piece.id}`] = el}
                >
                  {piece.label}
                </div>
              ))}
            </div>

            {/* Botón de calificación */}
            <div className="mt-2" style={{ marginTop: '0.5rem' }}>
              <CheckButton onClick={checkPuzzle} isComplete={isComplete} />
            </div>
          </div>

          {/* Panel derecho con el puzzle */}
          <div
            className="flex-1 bg-white p-4 rounded-lg shadow-lg flex flex-col"
            style={{
              ...commonStyles.panel,
              flex: 1,
              minHeight: '28rem', // Added minHeight for better vertical spacing
            }}
          >
            <div
              className="grid gap-2"
              style={{
                display: 'grid',
                gap: '0.5rem',
                gridTemplateRows: 'auto auto 1fr auto'
              }}
            >
              {/* Header */}
              {renderPlacedPiece('header', heights.h12)}

              {/* Nav */}
              {renderPlacedPiece('nav', heights.h10)}

              {/* Main content */}
              <div
                className="grid grid-cols-3 gap-2"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '0.5rem'
                }}
              >
                <div
                  className="col-span-2 space-y-2"
                  style={{
                    gridColumn: 'span 2 / span 2',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  {/* Section */}
                  {renderPlacedPiece('section', heights.h28)}
                </div>

                {/* Aside */}
                {renderPlacedPiece('aside', heights.hFull)}
              </div>

              {/* Footer */}
              {renderPlacedPiece('footer', heights.h12)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlPuzzle

