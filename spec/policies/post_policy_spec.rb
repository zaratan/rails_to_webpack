# frozen_string_literal: true

require 'spec_helper'

RSpec.describe PostPolicy do
  subject { described_class }

  let(:author) { create(:user) }
  let(:post) { create(:post, author: author) }

  permissions :update?, :destroy? do
    context "when the user isn't the author" do
      it "forbids the action" do
        expect(subject).not_to permit(create(:user), post)
      end
    end

    context "when the user is the author" do
      it "allows the action" do
        expect(subject).to permit(author, post)
      end
    end
  end
end
