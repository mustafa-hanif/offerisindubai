import { useState } from 'react'

export default function Story({
  id,
  title,
  // date,
  url,
  user,
  score,
  commentsCount,
}) {
  const { host } = url ? new URL(url) : { host: '#' }
  const [voted, setVoted] = useState(false)

  return (
    <div style={{ margin: '5px 0' }}>
      <div className="title">
        <span
          style={{
            cursor: 'pointer',
            fontFamily: 'sans-serif',
            marginRight: 5,
            color: voted ? '#ffa52a' : '#ccc',
          }}
          onClick={() => setVoted(!voted)}
        >
          &#9650;
        </span>
        <a href={url}>{title}</a>
        {url && (
          <span className="source">
            <a href={`http://${host}`}>{host.replace(/^www\./, '')}</a>
          </span>
        )}
      </div>
      <div className="meta">
        
        <a href={`/user?id=${user}`}>
          {user}
        </a>{' '}
        
      </div>
    </div>
  )
}

const plural = (n, s) => s + (n === 0 || n > 1 ? 's' : '')
