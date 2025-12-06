# Application does not use a database - ActiveRecord included for rake tasks only
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
