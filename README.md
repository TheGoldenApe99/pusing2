Golden Ape Arena — Warpcast Frame (Testnet: Base Sepolia)

Files in this package:
- index.html                (landing page)
- public/banner.svg         (banner image used by frame)
- api/frame.js              (Warpcast Frame endpoint)
- api/leaderboard.js        (on-chain leaderboard by activity)
- vercel.json               (Vercel routing)

Steps to deploy on Vercel:
1. Create a new Vercel project and connect the repo or upload this folder.
2. In Vercel project settings -> Environment Variables, set:
   - ALCHEMY_BASE_URL = https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   - NFT_CONTRACT = 0x5676fCF549f434D0D1E71baD9370cdb451968109
3. Deploy. After deploy, your frame endpoint will be:
   https://<your-deploy>.vercel.app/api/frame
4. On Warpcast, post: `/frame https://<your-deploy>.vercel.app/api/frame` to show the frame in feed.

Notes:
- The leaderboard endpoint fetches Transfer logs by scanning recent blocks. For large contracts or long histories, adjust lookback window or use indexed event API (Alchemy).
- This is configured for Base Sepolia (testnet). For mainnet change ALCHEMY_BASE_URL and links accordingly.
