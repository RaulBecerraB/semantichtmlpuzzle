const CheckButton = ({ onClick, isComplete }) => {
    return (
        <button
            onClick={onClick}
            disabled={isComplete}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isComplete
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
        >
            {isComplete ? '¡Puzzle Completado!' : 'Calificar'}
        </button>
    )
}

export default CheckButton 