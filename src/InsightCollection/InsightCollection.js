import union from 'lodash/union'
import ShapeJson from '@ballfish/shape_json'

class Item {
  constructor (value, meta = {}) {
    this.meta = meta
    this.value = value
  }
}

class InsightCollection {
  constructor (collection = []) {
    this.collection = collection
  }

  set (value, meta = {}) {
    this.collection = this.collection.concat(new Item(value, meta))
  }

  get (meta, match) {
    const result = this.collection.filter(item => {
      return Object.keys(match).every(key => match[key](meta[key], item.meta[key]))
    })
    return new InsightCollection(result)
  }

  concat (other) {
    return new InsightCollection(this.collection.concat(other.collection))
  }

  count () {
    return this.collection.length
  }

  isEmpty () {
    return this.collection.length === 0
  }

  pop () {
    return this.collection.pop()
  }

  /**
   * @param {string} metaKey - the key of meta
   * @param {Object} match - the match function collection of meta
   * @return {Object} - The entries which is pair metaName and new InsightCollection instance group by metaKey
   */
  group (metaKey, match) {
    const metas = union(this.collection.map(item => ({ [metaKey]: item.meta[metaKey] })))
    return metas
      .map(meta => ({ [meta[metaKey]]: this.get(meta, match) }))
      .reduce((object, item) => Object.assign({}, object, item), {})
  }

  summary (operate, defaultValue) {
    return this.collection.reduce((result, item) => operate(result, item.value), defaultValue)
  }

  clone () {
    return new InsightCollection([].concat(this.collection))
  }
}

export default InsightCollection
