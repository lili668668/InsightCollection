import Item from './Item'

class BaseInsight {
  /**
   * @param {BaseField[]} [fields=[]] - the default fields of insight
   */
  constructor (fields = []) {
    /** @type {Item[]} */
    this.items = []
    fields.forEach(field => this.setItem(field, 0))
  }

  /**
   * Set a item value in insight
   *
   * @param {BaseField} field - field property
   * @param {number|string} value - field value
   * @return {BaseInsight}
   */
  setItem (field, value) {
    const index = this.getItemIndex(field.value)

    let fixedValue = Number(value)
    if (!value) fixedValue = 0

    if (index >= 0) this.items[index].value = fixedValue
    else this.items = this.items.concat(new Item(field, fixedValue))

    return this
  }

  /**
   * Get the item according to field code
   *
   * @param {string} fieldCode - field code
   * @return {Item}
   */
  getItem (fieldCode) {
    return this.items.find(item => item.field.match(fieldCode))
  }

  /**
   * Get the index of the item according to field code
   *
   * @param {string} fieldCode - field code
   * @return {number}
   */
  getItemIndex (fieldCode) {
    return this.items.findIndex(item => item.field.match(fieldCode))
  }

  /**
   * Get the value of the item according to field code
   *
   * @param {string} fieldCode - field code
   * @return {number}
   */
  getValue (fieldCode) {
    const item = this.getItem(fieldCode)
    if (!item) return 0
    return item.value
  }

  /**
   * Get all fields
   *
   * @return {BaseField[]}
   */
  getFields () {
    return this.items.map(item => item.field)
  }

  /**
   * Get all field names without translation
   *
   * @return {string[]}
   */
  getFieldNames () {
    return this.items.map(item => item.field.label)
  }

  /**
   * Get all field names with translation
   *
   * @return {string[]}
   */
  getTranslatedFieldNames () {
    return this.items.map(item => item.field.getTranslatedLabel())
  }

  /**
   * Merge insight
   *
   * @param {BaseInsight} insight - the insight that you want to merge into this insight
   * @param {Object} otherInfo - other information pass to operate
   * @return {BaseInsight}
   */
  mergeInsight (insight, otherInfo) {
    const result = new BaseInsight()
    this.items.forEach(item => {
      const value = item.field.operate(this, insight, otherInfo)
      result.setItem(item.field, value)
    })
    return result
  }

  /**
   * Shape insight with fields and return new insight
   *
   * @param {Field[]} fields - the fields you want new insight has
   * @param {Object} otherInfo - other information pass to operate
   * @return {BaseInsight}
   */
  shape (fields, otherInfo) {
    const result = new BaseInsight()
    const emptyInsight = new BaseInsight()
    fields.forEach(field => {
      const value = field.operate(this, emptyInsight, otherInfo)
      result.setItem(field, value)
    })
    return result
  }

  /**
   * Transform insight to JSON Object and the key is field code
   *
   * @param {Object} option - processing option
   * @param {boolean} [option.toFormat=false] - if true, it will format value
   * @param {number} [option.currency=1] - if the field is money, it will be multiply by currency
   * @return {Object}
   */
  toJSONWithCode (option = { toFormat: false, currency: 1 }) {
    return this.items.reduce((object, item) => {
      const itemObject = item.toJSONWithCode(option)
      return Object.assign({}, object, itemObject)
    }, {})
  }

  /**
   * Transform insight to JSON Object and the key is field name
   *
   * @param {Object} option - processing option
   * @param {boolean} [option.toFormat=false] - if true, it will format value
   * @param {number} [option.currency=1] - if the field is money, it will be multiply by currency
   * @param {function} [option.translateFunction=(value) => (value)] - the function to translate label value, it will be trigger in field.translate function
   * @return {Object}
   */
  toJSONWithName (option = { toFormat: false, currency: 1, translateFunction: (value) => (value) }) {
    return this.items.reduce((object, item) => {
      const itemObject = item.toJSONWithName(option)
      return Object.assign({}, object, itemObject)
    }, {})
  }
}
export default BaseInsight
