class CreateMeasurements < ActiveRecord::Migration[5.0]
  def change
    create_table :measurements do |t|
      t.string    :kind
      t.float     :data1
      t.float     :data2
      t.float     :data3
      t.float     :data4
      t.datetime  :datetime
      t.integer   :device_id

      t.timestamps
    end
  end
end
