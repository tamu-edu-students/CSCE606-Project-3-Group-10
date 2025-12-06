require 'rails_helper'

RSpec.describe Tournament, type: :model do
  describe 'CSV export' do
    let!(:tournament1) { Tournament.create!(name: 'Summer Cup', mode: 'single_elimination') }
    let!(:tournament2) { Tournament.create!(name: 'Winter League', mode: 'double_elimination') }

    it 'exports all tournaments to CSV with correct headers' do
      csv = Tournament.to_csv
      lines = csv.split("\n")
      
      expect(lines[0]).to eq('name,mode')
      expect(lines[1]).to eq('Summer Cup,single_elimination')
      expect(lines[2]).to eq('Winter League,double_elimination')
    end

    it 'handles empty tournaments table' do
      Tournament.destroy_all
      csv = Tournament.to_csv
      lines = csv.split("\n")
      
      expect(lines.length).to eq(1) # Only header
      expect(lines[0]).to eq('name,mode')
    end

    it 'escapes special characters in CSV' do
      Tournament.create!(name: 'Tournament, with comma', mode: 'single')
      csv = Tournament.to_csv
      
      expect(csv).to include('"Tournament, with comma"')
    end
  end

  describe 'CSV import' do
    let(:csv_file) { Tempfile.new(['tournaments', '.csv']) }

    after { csv_file.close; csv_file.unlink }

    it 'imports tournaments from CSV file' do
      csv_file.write("name,mode\nSpring Cup,single_elimination\nFall League,round_robin")
      csv_file.rewind

      expect {
        Tournament.import(csv_file)
      }.to change(Tournament, :count).by(2)

      tournaments = Tournament.order(:name)
      expect(tournaments[0].name).to eq('Fall League')
      expect(tournaments[0].mode).to eq('round_robin')
      expect(tournaments[1].name).to eq('Spring Cup')
      expect(tournaments[1].mode).to eq('single_elimination')
    end

    it 'updates existing tournament if name matches' do
      Tournament.create!(name: 'Existing Tournament', mode: 'single')
      
      csv_file.write("name,mode\nExisting Tournament,double_elimination")
      csv_file.rewind

      expect {
        Tournament.import(csv_file)
      }.not_to change(Tournament, :count)

      tournament = Tournament.find_by(name: 'Existing Tournament')
      expect(tournament.mode).to eq('double_elimination')
    end

    it 'handles CSV with headers only' do
      csv_file.write("name,mode\n")
      csv_file.rewind

      expect {
        Tournament.import(csv_file)
      }.not_to change(Tournament, :count)
    end

    it 'handles malformed CSV gracefully' do
      csv_file.write("name,mode\nIncomplete")
      csv_file.rewind

      expect {
        Tournament.import(csv_file)
      }.not_to raise_error
    end
  end

  describe 'validations' do
    it 'creates a tournament with valid attributes' do
      tournament = Tournament.new(name: 'Test Tournament', mode: 'single_elimination')
      expect(tournament).to be_valid
    end

    it 'allows tournament without name' do
      tournament = Tournament.new(mode: 'single_elimination')
      expect(tournament).to be_valid
    end

    it 'allows tournament without mode' do
      tournament = Tournament.new(name: 'Test Tournament')
      expect(tournament).to be_valid
    end
  end
end
