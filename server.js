const express = require('express');
const app = express();
const { db, syncAndSeed, models: { Artist, Album, Song } } = require('./db');

app.get('/', async(req, res, next) => {
  try {
    const artists = await Artist.findAll({
      include: [{
        model: Album,
      }, {
        model: Song,
      }]
    });
    res.send(artists);
  } catch(err) {
    next(err)
  }
});

const init = async() => {
  try {
    await db.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch(err) {
    console.log(err);
  }
};

init();
