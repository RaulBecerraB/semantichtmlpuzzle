import './globals.css'

export const metadata = {
  title: 'HTML Semántico Puzzle',
  description: 'Aprende HTML semántico de forma interactiva',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="">
        {children}
      </body>
    </html>
  )
}
