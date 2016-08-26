const fetch = require('isomorphic-fetch')
const app = require('express')()
const fs = require('fs')

async function getImage() {
  let response = await fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat')
  let json = await response.json()

  return json.data.image_original_url
}

app.get('/', async (req, res) => {
  const imageUrl = await getImage()
  const template = await fs.readFileSync('cat.html', 'utf-8')
  res.end(template.replace('{{imageUrl}}', imageUrl));
})

app.listen(4000)
