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

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    username { "#{Faker::Internet.username}_#{Random.rand(10_000)}" }
    password { Faker::Lorem.characters(10) }

    trait :with_posts do
      after(:create) do |user|
        create_list(:post, Random.rand(1..4), author: user)
      end
    end
  end
end
