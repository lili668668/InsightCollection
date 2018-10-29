import numeral from 'numeral'

class Item {
  /**
   * @param {BaseField} field - field property
   * @param {number} value - field value
   */
  constructor (field, value) {
    /** @type {BaseField} */
    this.field = field
    /** @type {number} */
    this.value = value
  }

  /**
   * Format value
   * @param {number} value
   * @return {string}
   */
  _toFormat (value) {
    if (value === Infinity) {
      return '--'
    }
    return numeral(value).format(this.field.formatter)
  }

  /**
   * Transform Item to JSON Object and the key is field code
   *
   * @param {Object} option - processing option
   * @param {boolean} [option.toFormat=false] - if true, it will format value
   * @param {number} [option.currency=1] - if the field is money, it will be multiply by currency
   * @return {Object}
   */
  toJSONWithCode (option = { toFormat: false, currency: 1 }) {
    const { toFormat, currency } = option
    let value = this.field.isMoney ? this.value * currency : this.value
    if (toFormat) value = this._toFormat(value)
    return { [this.field.value]: value }
  }

  /**
   * Transform Item to JSON Object and the key is field name
   *
   * @param {Object} option - processing option
   * @param {boolean} [option.toFormat=false] - if true, it will format value
   * @param {number} [option.currency=1] - if the field is money, it will be multiply by currency
   * @param {function} [option.translateFunction=(value) => (value)] - the function to translate label value, it will be trigger in field.translate function
   * @return {Object}
   */
  toJSONWithName (option = { toFormat: false, currency: 1, translateFunction: (value) => (value) }) {
    const { toFormat, currency, translateFunction } = option
    const name = this.field.translate(translateFunction)
    let value = this.field.isMoney ? this.value * currency : this.value
    if (toFormat) value = this._toFormat(value)
    return { [name]: value }
  }
}

export default Item
