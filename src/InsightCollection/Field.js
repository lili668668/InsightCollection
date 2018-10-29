class Field {
  /**
   * @param {string} [label=''] the English field name
   * @param {string} [value=''] the field code
   */
  constructor (label = '', value = '') {
    /** @type {string} */
    this.label = label
    /** @type {string} */
    this.value = value
    /** @type {string} */
    this.commonCode = ''
    /** @type {boolean} */
    this.isMoney = false
    /** @type {string} */
    this.formatter = '0,0'
  }

  /**
   * translate label
   *
   * @param {function} translateFunction=(value) => (value) - the function to translate label value
   * @return {string} translated label
   */
  translate (translateFunction) {
    if (typeof translateFunction !== 'function') return this.label
    return translateFunction(this.label)
  }

  /**
   * Default operate is an accumulator
   * can be overrided
   *
   * @param {SingleInsight} summary - summary insight
   * @param {SingleInsight} current - current insight
   */
  operate (summary, current) {
    return summary.getValue(this.value) + current.getValue(this.value)
  }

  /**
   * Default match is to check whether value and field code equal
   * can be overrided
   *
   * @param {string} fieldCode - field code
   * @return {string} is field code matching value
   */
  match (fieldCode) {
    return this.value === fieldCode || this.commonCode === fieldCode
  }
}

export default Field
