const configure = [
  { label: 'All conv.', value: 'AllConversions' },
  { label: 'All conv. value', value: 'AllConversionValue' },
  { label: 'Clicks', value: 'Clicks', commonCode: 'clicks' },
  { label: 'Conversions', value: 'Conversions' },
  { label: 'Total conv. value', value: 'ConversionValue' },
  { label: 'Engagements', value: 'Engagements' },
  { label: 'Impressions', value: 'Impressions', commonCode: 'impressions' },
  { label: 'Cross-device conv.', value: 'CrossDeviceConversions' },
  { label: 'View-through conv.', value: 'ViewThroughConversions' },
  { label: 'Views', value: 'VideoViews' },
  { label: 'Conversions (current model)', value: 'CurrentModelAttributedConversions' },
  { label: 'Gmail forwards', value: 'GmailForwards' },
  { label: 'Gmail saves', value: 'GmailSaves' },
  { label: 'Gmail clicks to website', value: 'GmailSecondaryClicks' },
  { label: 'Interactions', value: 'Interactions' },

  { label: 'Avg. CPM', value: 'AverageCpm', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Impressions')) },
  { label: 'Avg. CPV', value: 'AverageCpv', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('VideoViews')) },
  { label: 'Cost / all conv.', value: 'CostPerAllConversion', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('AllConversions')) },
  { label: 'Cost / conv.', value: 'CostPerConversion', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Conversions')) },
  { label: 'Avg. CPC', value: 'AverageCpc', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Clicks')) },
  { label: 'Avg. CPE', value: 'AverageCpe', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Engagements')) },
  { label: 'Cost / conv. (current model)', value: 'CostPerCurrentModelAttributedConversion', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Conversions (current model)')) },
  { label: 'Avg. Cost', value: 'AverageCost', isMoney: true, formatter: '$0,0.00', operate: (summary, current) => (summary.getValue('Cost') / summary.getValue('Interactions')) },

  { label: 'Cost', value: 'Cost', commonCode: 'cost', isMoney: true, formatter: '$0,0.00' },

  { label: 'All conv. rate', value: 'AllConversionRate', formatter: '0,0.00%', operate: (summary, current) => (summary.getValue('AllConversions') / summary.getValue('Clicks')) },
  { label: 'Conv. rate', value: 'ConversionRate', formatter: '0,0.00%', operate: (summary, current) => (summary.getValue('Conversions') / summary.getValue('Clicks')) },
  { label: 'CTR', value: 'Ctr', commonCode: 'ctr', operate: (summary, current) => (summary.getValue('Clicks') / summary.getValue('Impressions')), formatter: '0,0.00%' },
  { label: 'Engagement rate', value: 'EngagementRate', formatter: '0,0.00%', operate: (summary, current) => (summary.getValue('Clicks') / summary.getValue('Impressions')) },
  { label: 'Video played to 100%', value: 'VideoQuartile100Rate', formatter: '0,0.00%' },
  { label: 'Video played to 25%', value: 'VideoQuartile25Rate', formatter: '0,0.00%' },
  { label: 'Video played to 50%', value: 'VideoQuartile50Rate', formatter: '0,0.00%' },
  { label: 'Video played to 75%', value: 'VideoQuartile75Rate', formatter: '0,0.00%' },
  { label: 'View rate', value: 'VideoViewRate', formatter: '0,0.00%', operate: (summary, current) => (summary.getValue('Views') / summary.getValue('Impressions')) },
  { label: 'Interaction Rate', value: 'InteractionRate', formatter: '0,0.00%', operate: (summary, current) => (summary.getValue('Interactions') / summary.getValue('Impressions')) }
]

export default configure
