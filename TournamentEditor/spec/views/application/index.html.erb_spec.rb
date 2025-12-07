require 'rails_helper'

RSpec.describe 'application/index.html.erb', type: :view do
  it 'displays the bracket empty state' do
    render template: 'application/index'
    expect(rendered).to have_selector('#bracket-empty-state')
  end

#   it 'includes the bracket viewer container' do
#     render template: 'application/index'
#     expect(rendered).to have_selector('#bracket-viewer-container')
#   end

#   it 'includes draft mode controls' do
#     render template: 'application/index'
#     expect(rendered).to have_selector('#draft-mode-controls')
#   end

#   it 'includes the bracket viewer' do
#     render template: 'application/index'
#     expect(rendered).to have_selector('#bracket-viewer')
#   end

#   it 'includes Add Competitors button' do
#     render template: 'application/index'
#     expect(rendered).to have_button('Add Competitors')
#   end

#   it 'includes Validate button' do
#     render template: 'application/index'
#     expect(rendered).to have_button('Validate')
#   end

#   it 'includes Confirm Changes button' do
#     render template: 'application/index'
#     expect(rendered).to have_button('Confirm Changes')
#   end

  it 'includes empty state message' do
    render template: 'application/index'
    expect(rendered).to have_content('No Bracket Created')
  end

  it 'includes JavaScript files' do
    render template: 'application/index'
    expect(rendered).to include('bracket_manager.js')
    expect(rendered).to include('competitor_edit_delete.js')
    expect(rendered).to include('add_competitors.js')
  end
end
