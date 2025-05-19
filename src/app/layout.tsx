import Navbar from '@/components/navbar'
import './global.css'
import Footer from '@/components/Footer'
export const metadata = {
  title: 'Shantanu Panda',
  description: 'Turning complex challenges into precision-driven solutions through the art of mechatronics and robotics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  )
}
