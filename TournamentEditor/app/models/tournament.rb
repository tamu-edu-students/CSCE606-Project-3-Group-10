# Application does not use a database - all work is done on the front end
# This model exists for compatibility but is not used
require 'csv'

class Tournament < ApplicationRecord
  # Tournament data is stored in browser localStorage, not a database
  # This model exists only to prevent eager loading errors
end
