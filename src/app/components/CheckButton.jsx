const CheckButton = ({ onClick, isComplete }) => {
    return (
        <button
            onClick={onClick}
            disabled={isComplete}
            style={{
                backgroundColor: isComplete ? '#22c55e' : '#3b82f6',
                color: 'white',
                cursor: isComplete ? 'default' : 'pointer',
                fontWeight: 500,
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                transition: 'background-color 0.2s, color 0.2s'
            }}
        >
            {isComplete ? '¡Puzzle Completado!' : 'Calificar'}
        </button>
    )
}

export default CheckButton