require 'date'

class Api::V1::MeasurementsController < ApplicationController
  def index
    @measurements = Measurement.order("datetime")
    @measurements = @measurements.where("kind=?", params[:kind])            if !params[:kind].blank?
    @measurements = @measurements.where("device_id=?", params[:device_id])  if !params[:device_id].blank?
    @measurements = @measurements.where("datetime >= ?", "#{Chronic.parse(params[:begin_date], :endian_precedence => :little)}") if !params[:begin_date].blank?
    @measurements = @measurements.where("datetime <= ?", "#{Chronic.parse(params[:end_date], :endian_precedence => :little)}")   if !params[:end_date].blank?
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

        Measurement.create({device_id: 1, 
                            kind: line[1], 
                            data1: line[2], 
                            data2: line[3], 
                            data3: line[4], 
                            data4: line[5], 
                            datetime: Time.at(line[0].to_i/1000).to_datetime})
      end
    end

    render json: {}
  end


  private
  def ad_params
    params.permit(:kind, :data1, :data2, :data3, :data4, :datetime, :device_id)
  end
end
