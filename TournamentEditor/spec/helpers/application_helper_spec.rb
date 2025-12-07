require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  describe 'included in ApplicationHelper' do
    it 'is a module' do
      expect(ApplicationHelper).to be_a(Module)
    end
  end
end
