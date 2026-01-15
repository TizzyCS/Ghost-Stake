"use client" // must be at the top

import { useEffect, useState } from "react"

export default function Home() {
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/odds")
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading…</p>

  return (
    <main style={{ padding: 24 }}>
      <h1>GhostStake 👻</h1>

      {games.length === 0 && <p>No games right now</p>}

      {games.map((game: any) => (
        <div key={game.id} style={{ marginBottom: 20 }}>
          <h3>
            {game.home_team} vs {game.away_team}
          </h3>

          {game.bookmakers?.[0]?.markets?.[0]?.outcomes?.map((o: any) => (
            <button key={o.name} style={{ marginRight: 10 }}>
              {o.name}: {o.price}
            </button>
          ))}
        </div>
      ))}
    </main>
  )
}
