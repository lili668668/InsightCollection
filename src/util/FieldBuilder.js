import Field from '../InsightCollection/Field'

class FieldBuilder {
  setConfigures(configs = []) {
    this.configs = configs
    return this
  }

  buildField(code) {
    if (!this.configs) this.configs = []

    const fieldConfig = this.configs.find(config => {
      if (typeof config.match !== 'function') return config.value === code
      return config.match(code)
    })

    const field = new Field(fieldConfig.label, fieldConfig.code)
    if (fieldConfig.commonCode) field.commonCode = fieldConfig.commonCode
    if (fieldConfig.isMoney) field.isMoney = fieldConfig.isMoney
    if (fieldConfig.formatter) field.formatter = fieldConfig.formatter
    if (fieldConfig.match) field.match = fieldConfig.match
    if (fieldConfig.operate) field.operate = fieldConfig.operate
    if (fieldConfig.translate) field.translate = fieldConfig.translate

    return field
  }
}

export default FieldBuilder
