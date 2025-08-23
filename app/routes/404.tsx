import { useNavigate } from 'react-router'
import Navbar from '~/components/Navbar'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16 text-center">
          <h1>Page Not Found</h1>
          <h2>The page you're looking for doesn't exist.</h2>
          <button 
            className="primary-button mt-8"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
        </div>
      </section>
    </main>
  )
}

export default NotFound
