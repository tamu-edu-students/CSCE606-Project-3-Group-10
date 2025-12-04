require 'rails_helper'

RSpec.describe Match, type: :model do
  describe 'creation' do
    it 'creates a valid match' do
      match = Match.new(competitors: 'Player 1 vs Player 2', mode: 'single_elimination')
      expect(match).to be_valid
    end

    it 'saves match to database' do
      expect {
        Match.create!(competitors: 'Player 1 vs Player 2', mode: 'single_elimination')
      }.to change { Match.count }.by(1)
    end
  end

  describe 'attributes' do
    it 'stores competitors' do
      match = Match.new(competitors: 'Player 1 vs Player 2')
      expect(match.competitors).to eq('Player 1 vs Player 2')
    end

    it 'stores winner' do
      match = Match.new(competitors: 'Player 1 vs Player 2', winner: 'Player 1')
      expect(match.winner).to eq('Player 1')
    end

    it 'stores mode' do
      match = Match.new(mode: 'single_elimination')
      expect(match.mode).to eq('single_elimination')
    end
  end
end

