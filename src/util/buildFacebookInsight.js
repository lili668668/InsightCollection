import Insight from '../InsightCollection/Insight'
import FieldBuilder from './FieldBuilder'
import FacebookConfigure from '../configures/FacebookConfigure'

/**
 * @param {Object} [data={}] - origin fetched data { click: ... , actions: [ ... ] }
 * @return {Insight}
 */
const build = (data = {}) => {
  const insight = new Insight()
  const builder = new FieldBuilder().setConfigures(FacebookConfigure)
  Object.keys(data)
    .forEach(code => {
      if (Array.isArray(data[code])) { // get field codes
        if (Array.isArray(data[code])) { // unfolder action types
          data[code]
            .forEach(action => {
              const fixedCode = `${code}:${action.action_type}`
              const field = builder.buildField(fixedCode)
              insight.setItem(field, action.value)
            })
        } else {
          const field = builder.buildField(fixedCode)
          insight.setItem(field, data[code])
        }
      }
    })
  return insight
}

export default build
