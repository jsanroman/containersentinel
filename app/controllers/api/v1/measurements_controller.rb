class Api::V1::MeasurementsController < ApplicationController
  def index
    @measurements = Measurement.all
  end

  def create
    Measurement.create(params.permit(:kind, :data1, :data2, :data3, :data4, :datetime, :device_id))
  end


  private
  def ad_params
    params.permit(:kind, :data1, :data2, :data3, :data4, :datetime, :device_id)
  end
end
