require 'rails_helper'

RSpec.describe Competitor, type: :model do
  describe 'creation' do
    it 'creates a valid competitor' do
      competitor = Competitor.new(name: 'Test Competitor', wins: '0', loses: '0')
      expect(competitor).to be_valid
    end

    it 'saves competitor to database' do
      expect {
        Competitor.create!(name: 'Test Competitor', wins: '0', loses: '0')
      }.to change { Competitor.count }.by(1)
    end
  end

  describe 'attributes' do
    it 'has name attribute' do
      competitor = Competitor.new(name: 'Player 1')
      expect(competitor.name).to eq('Player 1')
    end

    it 'tracks wins' do
      competitor = Competitor.new(name: 'Player 1', wins: '5')
      expect(competitor.wins).to eq('5')
    end

    it 'tracks losses' do
      competitor = Competitor.new(name: 'Player 1', loses: '3')
      expect(competitor.loses).to eq('3')
    end
  end
end

