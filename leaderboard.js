import { ethers } from 'ethers'

const ALCHEMY = process.env.ALCHEMY_BASE_URL || ''
const NFT_CONTRACT = process.env.NFT_CONTRACT || '0x5676fCF549f434D0D1E71baD9370cdb451968109'

export default async function handler(req, res) {
  try {
    if(!ALCHEMY) return res.status(500).send('ALCHEMY_BASE_URL not configured in env')
    const provider = new ethers.JsonRpcProvider(ALCHEMY)
    const iface = new ethers.Interface(['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'])
    // get recent logs
    const currentBlock = await provider.getBlockNumber()
    const fromBlock = Math.max(0, currentBlock - 50000)
    const filter = { address: NFT_CONTRACT, fromBlock, toBlock: currentBlock, topics: [ethers.id('Transfer(address,address,uint256)')] }
    const logs = await provider.getLogs(filter)
    const counts = {}
    for(const log of logs){
      const parsed = iface.parseLog(log)
      const from = parsed.args.from
      const to = parsed.args.to
      counts[from] = (counts[from] || 0) + 1
      counts[to] = (counts[to] || 0) + 1
    }
    const rows = Object.entries(counts).map(([addr, cnt]) => ({ addr, cnt }))
    rows.sort((a,b)=>b.cnt - a.cnt)
    let html = `<!doctype html><html><head><meta property="fc:frame" content="vNext" /><meta property="og:title" content="Golden Ape Arena — Leaderboard" /></head><body style="font-family:Inter,Arial">`;
    html += '<h2>Leaderboard — Top activity (by transfers)</h2>'
    html += '<table border="0" cellpadding="6" style="border-collapse:collapse">'
    html += '<tr><th>Rank</th><th>Address</th><th>Activity</th></tr>'
    for(let i=0;i<Math.min(10,rows.length);i++){
      const r = rows[i]
      html += `<tr><td>${i+1}</td><td><a href="https://sepolia.basescan.org/address/${r.addr}" target="_blank">${r.addr}</a></td><td>${r.cnt}</td></tr>`
    }
    html += '</table>'
    html += '<p><a href="/">Back</a></p>'
    html += '</body></html>'
    res.setHeader('Content-Type','text/html')
    res.status(200).send(html)
  } catch(e){
    console.error(e)
    res.status(500).send('Error generating leaderboard: '+String(e))
  }
}
