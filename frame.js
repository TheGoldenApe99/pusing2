import { ethers } from 'ethers'

const PLAY_TEXT = 'Play for 0.0005 ETH'

export default async function handler(req, res) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''
  const leaderboardUrl = baseUrl ? `${baseUrl}/api/leaderboard` : '/api/leaderboard'
  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(`<!doctype html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/banner.svg" />
    <meta property="fc:frame:button:1" content="${PLAY_TEXT}" />
    <meta property="fc:frame:button:1:post_url" content="${leaderboardUrl}" />

    <meta property="og:title" content="Golden Ape Arena 🦍" />
    <meta property="og:description" content="Adu NFT-mu dan rebut reward ETH di arena Base Sepolia!" />
    <meta property="og:image" content="${baseUrl}/banner.svg" />
  </head>
  <body>
    <h1>Golden Ape Arena</h1>
    <p>Click '${PLAY_TEXT}' to view leaderboard and start a match (testnet).</p>
  </body>
</html>`)
}
