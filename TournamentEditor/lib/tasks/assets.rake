# Stub assets:precompile task for Heroku
# Application does not use asset pipeline - assets are in public directory
namespace :assets do
  desc "Stub task for Heroku (assets are in public directory)"
  task :precompile do
    puts "Skipping asset precompilation - assets are in public directory"
  end
end
