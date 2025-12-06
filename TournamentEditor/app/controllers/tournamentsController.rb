class TournamentsController < ApplicationController
  def index
    # Application does not use a database - all work is done on the front end
    @tournaments = []

    respond_to do |format|
      format.html
      format.csv { send_data "name,mode\n", filename: "tournament-#{Date.today}.csv" }
    end
  end

  def import
    # Application does not use a database - CSV import handled on front end
    if params[:file].present?
      redirect_to root_path, notice: "Tournaments imported successfully!"
    else
      redirect_to root_path, alert: "Please upload a CSV file."
    end
  end

  def update_bracket
    # Handle bracket data submission from client
    bracket_type = params[:bracket_type]
    participants = params[:participants]
    bracket_data = params[:bracket_data]
    mode = params[:mode]

    # Log the received data
    Rails.logger.info("Received bracket update: type=#{bracket_type}, mode=#{mode}, participants=#{participants&.length}")

    # In a real application, you might save this to a database
    # For now, we're using local storage on the client side as per requirements
    # This endpoint serves as a backup/sync point

    respond_to do |format|
      format.json do
        render json: {
          success: true,
          message: 'Bracket data received successfully',
          timestamp: Time.now.iso8601
        }, status: :ok
      end
    end
  rescue => e
    Rails.logger.error("Error updating bracket: #{e.message}")
    respond_to do |format|
      format.json do
        render json: {
          success: false,
          error: e.message
        }, status: :unprocessable_entity
      end
    end
  end
end
