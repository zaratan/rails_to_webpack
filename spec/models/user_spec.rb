# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#

require 'rails_helper'

RSpec.describe User, type: :model do
  subject do
    build(:user)
  end

  it "is creatable" do
    user = create(:user).reload
    expect(user.id).not_to be_nil
    expect(user.username).not_to be_nil
    expect(user.email).not_to be_nil
  end

  it "follows the posts link" do
    user = create(:user, :with_posts).reload
    expect(user.posts.first.author).to eq(user)
  end

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:username) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  it { is_expected.to validate_uniqueness_of(:username).case_insensitive }
  it { is_expected.to have_many(:posts).inverse_of(:author) }
end
