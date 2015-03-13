require 'csv'
require 'json'

features = []

CSV.foreach('stops.txt', headers: true) do |row|
  features << {
    type: 'Feature',
    properties: {
      name: row['stop_name']
    },
    geometry: {
      type: 'Point',
      coordinates: [row['stop_lon'].to_f, row['stop_lat'].to_f]
    }
  }
end

File.open('stops.json', 'w') do |f|
  f.write(JSON.pretty_generate({type: 'FeatureCollection', features: features}))
end
