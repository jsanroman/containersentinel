require 'date'

class Api::V1::MeasurementsController < ApplicationController
  def index
    @measurements = Measurement.all
  end

  def create
    data  = params[:data].gsub(" ", "")
    data  = URI.decode(data)
    data = data.split("\r\n")

    if data.size>0
      data.each do |line|
        line = line.split(",")

        Measurement.create({device_id: 1, 
                            kind: line[1], 
                            data1: line[2], 
                            data2: line[3], 
                            data3: line[4], 
                            data4: line[5], 
                            datetime: Time.at(line[0].to_i/1000).to_datetime})
      end
    end
  end


  private
  def ad_params
    params.permit(:kind, :data1, :data2, :data3, :data4, :datetime, :device_id)
  end
end
