require 'rails_helper'

RSpec.describe ApplicationMailer, type: :mailer do
  it 'has correct default from address' do
    expect(ApplicationMailer.default[:from]).to eq('from@example.com')
  end

  it 'uses mailer layout' do
    expect(ApplicationMailer._layout).to eq('mailer')
  end

  it 'inherits from ActionMailer::Base' do
    expect(ApplicationMailer.superclass).to eq(ActionMailer::Base)
  end
end
