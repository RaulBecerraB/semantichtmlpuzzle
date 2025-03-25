/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'shake': 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-12px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(12px)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    // Colores de fondo
    'bg-blue-100', 'bg-pink-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-green-50', 
    'bg-gray-200', 'bg-gray-100', 'bg-gray-50', 'bg-white', 'bg-blue-500', 'bg-blue-600', 'bg-black/30',
    'bg-red-100', 'bg-blue-100', 'bg-green-100',
    
    // Textos
    'text-xs', 'text-sm', 'text-lg', 'text-xl', 'text-2xl', 'text-4xl',
    'text-gray-500', 'text-gray-700', 'text-gray-900',
    'text-blue-500', 'text-blue-600', 'text-blue-700',
    'text-red-500', 'text-red-700',
    'text-green-500', 'text-green-600', 'text-green-700',
    'text-white',
    
    // Flex y grid
    'flex', 'flex-col', 'flex-grow', 'flex-1', 'grid', 'grid-cols-3', 'col-span-2',
    'items-center', 'justify-center', 'space-y-2',
    
    // Margins y paddings
    'p-2', 'p-4', 'p-8', 'px-3', 'py-1', 'px-4', 'py-2', 'mb-2', 'mb-4', 'mb-8', 'mt-2', 'mt-4',
    
    // Bordes y sombras
    'rounded', 'rounded-lg', 'rounded-xl', 'shadow', 'shadow-lg', 'shadow-2xl',
    'border', 'border-dashed', 'border-gray-400',
    
    // Dimensiones
    'h-full', 'w-full', 'h-12', 'h-10', 'h-28', 'w-48', 'max-w-md', 'max-w-4xl',
    
    // Efectos
    'animate-shake', 'animate-bounce-slow',
    'blur-sm', 'backdrop-blur-sm',
    'hover:bg-gray-50', 'hover:bg-blue-600',
    'transition-colors', 'transform',
    
    // Posicionamiento
    'relative', 'absolute', 'inset-0', 'inset-x-2', 'bottom-1', 'fixed', 'z-10', 'z-20',
    
    // Misc
    'cursor-move', 'overflow-y-auto', 'overflow-hidden'
  ],
  plugins: [],
}; 