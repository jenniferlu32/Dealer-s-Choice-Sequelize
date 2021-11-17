const { Sequelize, Model, STRING } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/albums', { logging: false });

class Artist extends Model {};
Artist.init({
  name: {
    type: STRING,
  }
}, { sequelize: db, timestamps: false, modelName: 'artists' });

class Album extends Model {};
Album.init({
  name: {
    type: STRING,
  }
}, { sequelize: db, timestamps: false, modelName: 'albums' });

class Song extends Model {};
Song.init({
  name: {
    type: STRING,
  }
}, { sequelize: db, timestamps: false, modelName: 'songs' });

Artist.hasMany(Album); //adds artistId to album
Album.hasMany(Song); //adds albumId to song
Song.belongsTo(Artist); //adds artistId to song
Artist.hasMany(Song);

const syncAndSeed = async() => {

  await db.sync({ force: true });

  const [ frankOcean, taylorSwift ] = await Promise.all(
    ['Frank Ocean', 'Taylor Swift'].map(name => Artist.create({ name }))
  );

  const [ blonde, orange, red, evermore ] = await Promise.all(
    ['Blonde', 'Orange', 'Red', 'Evermore'].map(name => Album.create({ name }))
  );

  const [ selfControl, godspeed, whiteFerrari, forestGump, lost, superRichKids, redSong, allTooWell, theLastTime, evermoreSong, champagneProblems, tolerateIt ] = await Promise.all(
    ['Self Control', 'Godspeed', 'White Ferrari', 'Forest Gump', 'Lost', 'Super Rich Kids', 'Red', 'All Too Well', 'The Last Time', 'Evermore', 'Champagne Problems', 'Tolerate It'].map(name => Song.create({ name }))
  );

  await Promise.all([
    blonde.update({
      artistId: frankOcean.id
    }),
    orange.update({
      artistId: frankOcean.id
    }),
    red.update({
      artistId: taylorSwift.id
    }),
    evermore.update({
      artistId: taylorSwift.id
    }),
    selfControl.update({
      albumId: blonde.id,
      artistId: frankOcean.id
    }),
    godspeed.update({
      albumId: blonde.id,
      artistId: frankOcean.id
    }),
    whiteFerrari.update({
      albumId: blonde.id,
      artistId: frankOcean.id
    }),
    forestGump.update({
      albumId: orange.id,
      artistId: frankOcean.id
    }),
    lost.update({
      albumId: orange.id,
      artistId: frankOcean.id
    }),
    superRichKids.update({
      albumId: orange.id,
      artistId: frankOcean.id
    }),
    redSong.update({
      albumId: red.id,
      artistId: taylorSwift.id
    }),
    allTooWell.update({
      albumId: red.id,
      artistId: taylorSwift.id
    }),
    theLastTime.update({
      albumId: red.id,
      artistId: taylorSwift.id
    }),
    evermoreSong.update({
      albumId: evermore.id,
      artistId: taylorSwift.id
    }),
    champagneProblems.update({
      albumId: evermore.id,
      artistId: taylorSwift.id
    }),
    tolerateIt.update({
      albumId: evermore.id,
      artistId: taylorSwift.id
    })
  ]
  )
};

module.exports = {
  db,
  syncAndSeed,
  models: { Artist, Album, Song }
}
