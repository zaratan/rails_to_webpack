# frozen_string_literal: true

RSpec.define_context "empty params", ns: 'interactors' do |param_name|
  context "with empty #{param_name}" do
    let(param_name.to_sym) { nil }

    it "is a failure" do
      expect(subject).to be_failure
      expect(subject.errors).not_to be_empty
      expect(subject.breaches).to eq([param_name.to_sym])
    end
  end
end
