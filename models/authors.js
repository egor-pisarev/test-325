const Base = require('./base');

class Authors extends Base {
  get table() {
    return 'Authors'
  }
  get attributes() {
    return ['id','title']
  }
}

module.exports = new Authors;
