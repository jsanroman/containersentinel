class DashboardController < ApplicationController
  def index

    if params[:reference].blank?
      render :select_reference
    else

      render :index
    end
  end

end
