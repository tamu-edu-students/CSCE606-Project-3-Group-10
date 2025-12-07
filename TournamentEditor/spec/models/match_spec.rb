require 'rails_helper'

RSpec.describe Match, type: :model do
  describe 'creation' do
    it 'creates a match with valid attributes' do
      match = Match.create!(
        competitors: 'Player1,Player2',
        winner: 'Player1',
        mode: 'best_of_3'
      )

      expect(match).to be_persisted
      expect(match.competitors).to eq('Player1,Player2')
      expect(match.winner).to eq('Player1')
      expect(match.mode).to eq('best_of_3')
    end

    it 'creates a match with minimal attributes' do
      match = Match.create!
      expect(match).to be_persisted
    end
  end

  describe 'attributes' do
    it 'has competitors, winner, and mode attributes' do
      match = Match.new
      expect(match).to respond_to(:competitors)
      expect(match).to respond_to(:winner)
      expect(match).to respond_to(:mode)
    end
  end
end
