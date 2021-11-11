import Header from './header'
import Meta from './meta'

export default function Page({ children }) {
  return (
    <div className="main">
      <Meta />
      <Header />
      <div className="page">{children}</div>
    </div>
  )
}
