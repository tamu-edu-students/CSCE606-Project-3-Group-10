require 'rails_helper'

RSpec.describe Competitor, type: :model do
  describe 'creation' do
    it 'creates a competitor with valid attributes' do
      competitor = Competitor.create!(
        name: 'John Doe',
        wins: '5',
        loses: '2'
      )

      expect(competitor).to be_persisted
      expect(competitor.name).to eq('John Doe')
      expect(competitor.wins).to eq('5')
      expect(competitor.loses).to eq('2')
    end

    it 'creates a competitor with minimal attributes' do
      competitor = Competitor.create!
      expect(competitor).to be_persisted
    end
  end

  describe 'attributes' do
    it 'has name, wins, and loses attributes' do
      competitor = Competitor.new
      expect(competitor).to respond_to(:name)
      expect(competitor).to respond_to(:wins)
      expect(competitor).to respond_to(:loses)
    end
  end
end
