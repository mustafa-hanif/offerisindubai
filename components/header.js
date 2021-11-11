import Nav from './nav'
import Logo from './logo'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='bg-yellow-600'>
      <div className="left">
        <Link href="/">
          <a>
            <span className="logo">
              <Logo />
            </span>
            <span className="site-title">Hacker Next</span>
          </a>
        </Link>
        <div className="nav">
          <Nav />
        </div>
      </div>
      <div className="right">
        <a href="/login" className="login">login</a>
      </div>
    </header>
  )
}
