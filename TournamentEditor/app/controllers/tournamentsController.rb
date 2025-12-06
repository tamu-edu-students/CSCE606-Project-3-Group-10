class TournamentsController < ApplicationController
  def index
    @tournaments = Tournament.all
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
  end
end
