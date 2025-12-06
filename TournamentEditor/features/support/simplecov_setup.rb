# SimpleCov configuration for Cucumber tests
# This file must be loaded before any application code is required
# It is loaded from env.rb at the very top

require 'simplecov'

# Start SimpleCov with Rails-specific configuration
# This groups coverage by Controllers, Models, Helpers, Jobs, Mailers, Channels
SimpleCov.start 'rails' do
  # Set minimum coverage threshold (optional, can be adjusted)
  # minimum_coverage 80
  
  # Filter out test files, migrations, and other non-application code
  add_filter '/spec/'
  add_filter '/test/'
  add_filter '/features/'
  add_filter '/config/'
  add_filter '/db/'
  add_filter '/vendor/'
  add_filter '/bin/'
  add_filter '/lib/tasks/'
  
  # Track coverage for application code
  track_files 'app/**/*.rb'
  
  # Output directory for coverage reports
  coverage_dir 'coverage'
  
  # Use HTML formatter (default) - generates coverage/index.html
  # Can add additional formatters if needed
end
