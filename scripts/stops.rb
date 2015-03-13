require 'csv'
require 'json'

features = []

CSV.foreach('stops.txt', headers: true) do |row|
  features << {
    type: 'Feature',
    properties: {
      stop_id: row['stop_id'],
      stop_name: row['stop_name'],
      location_type: row['location_type'],
      parent_station: row['parent_station'],
      stop_short_name: row['stop_short_name']
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
