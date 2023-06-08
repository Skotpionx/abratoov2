export const metadata = {
  title: 'Soul Tattoo GRX',
  description: '',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="es">
      <head>
            <meta name='description' content='Your Tattoo Shop'/>
            <link rel="icon" href="/soullogo.png" />        
        </head>
      <body>{children}</body>
    </html>
  )
}
