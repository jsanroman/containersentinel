json.kind       measurement.kind
json.data1      measurement.data1
json.data2      measurement.data2
json.data3      measurement.data3
json.data4      measurement.data4
json.datetime   measurement.datetime
json.timestamp  (!measurement.datetime.nil? ? measurement.datetime.to_time.to_i : nil)
json.device_id  measurement.device_id
