require 'date'

class Api::V1::MeasurementsController < ApplicationController
  def index
    @measurements = Measurement.order("datetime")
    @measurements = @measurements.where("kind=?", params[:kind])            if !params[:kind].blank?
    @measurements = @measurements.where("device_id=?", params[:device_id])  if !params[:device_id].blank?
    @measurements = @measurements.where("datetime >= ?", "#{Chronic.parse(params[:begin_date], :endian_precedence => :little)}") if !params[:begin_date].blank?
    # @measurements = @measurements.where("datetime <= ?", "#{Chronic.parse(params[:end_date], :endian_precedence => :little)}")   if !params[:end_date].blank?
    @measurements = @measurements.where("device_id=?", params[:device_id])  if !params[:device_id].blank?
  end

  def create
    logger.warn(params[:data])

    data  = params[:data].gsub(" ", "")
    data  = URI.decode(data)

    logger.warn(data)

    data = data.split("\n")

    if data.size>0
      data.each do |line|
        line = line.split(",")

        _measurement = Measurement.create({
                            device_id: 1, 
                            kind: line[1], 
                            data1: line[2], 
                            data2: line[3], 
                            data3: line[4], 
                            data4: line[5], 
                            datetime: Time.at(line[0].to_i/1000).to_datetime})

        if _measurement.kind=='gps'
          RestClient.get "https://jsanroman.cartodb.com/api/v2/sql?q=INSERT INTO ollocontainer (description, name, the_geom) VALUES ('description', 'name', ST_SetSRID(ST_Point(#{_measurement.data2}, #{_measurement.data1}),4326))&api_key=f01d8adf43cdd91138dd250357ecf48ae9f8102e"
        end
      end
    end

    render json: {}
  end


  private
  def ad_params
    params.permit(:kind, :data1, :data2, :data3, :data4, :datetime, :device_id)
  end
end
