import Footer from './components/Footer'
import './globals.css'

export const metadata = {
  title: 'Spark Persoonlijke Ontwikkeling',
  description: 'Spark Persoonlijke Ontwikkeling Quickscan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
      <script defer data-domain="quickscan.wijzijnspark.nl" src="https://plausible.io/js/script.tagged-events.js"></script>
        <link rel="stylesheet" href="https://use.typekit.net/dqi3fxg.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans bg-[#F5EDE2] flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
