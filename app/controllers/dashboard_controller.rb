class DashboardController < ApplicationController
  def index
    @device = Device.find_by_reference(params[:reference]) if !params[:reference].blank?

    if @device.nil?
      render :select_reference
    else
      @measurements = @device.measurements

      render :index
    end
  end
end
