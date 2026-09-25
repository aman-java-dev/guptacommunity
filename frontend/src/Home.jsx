import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-brand">
          <span aria-hidden="true" className="home-brand-mark">GS</span>
          <span>Gupta Samaj</span>
        </div>
        <button
          className="home-logout"
          onClick={() => navigate('/')}
          type="button"
        >
          Log out
        </button>
      </header>

      <section aria-labelledby="home-title" className="home-welcome">
        <p className="home-kicker">Community portal</p>
        <span aria-hidden="true" className="home-rule" />
        <h1 id="home-title">Welcome to Gupta Samaj Community</h1>
      </section>
    </main>
  )
}

export default Home