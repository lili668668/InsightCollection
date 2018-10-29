import Insight from '../InsightCollection/Insight'
import FieldBuilder from './FieldBuilder'
import DisplayConfigure from '../configures/GoogleDisplayConfigure'
import SearchConfigure from '../configures/GoogleSearchConfigure'
import VideoConfigure from '../configures/GoogleVideoConfigure'

/**
 * @param {Object} [data={}] - origin fetched data { click: ...  }
 * @return {Insight}
 */
const build = (data = {}) => {
  const insight = new Insight()
  const configs = [ ...DisplayConfigure, ...SearchConfigure, ...VideoConfigure ]
  const builder = new FieldBuilder().setConfigures(configs)
  Object.keys(data)
    .forEach(code => {
      const field = builder.buildField(code)
      let value = data[code].replace('%', '')
      if (code === 'cost' || code === 'avgCost') {
        value = Number(value) / 1000000
      }
      insight.setItem(field, value)
    })
  return insight
}

export default build
