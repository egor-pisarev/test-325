const Base = require('./base');
const base64ToImage = require('base64-to-image');
const uuid = require('uuid/v4')

class Images extends Base {
  get table() {
    return 'Images'
  }
  get attributes() {
    return ['id', 'filename']
  }

  async createFromBase64(base64) {
    let path =`${__dirname}/../files/images/`;
    let filename = `${uuid()}.png`;
    let opt = {'fileName': filename, 'type':'png'};
    
    base64ToImage(base64, path, opt);

    return super.create({filename});
  }
}

module.exports = new Images;
