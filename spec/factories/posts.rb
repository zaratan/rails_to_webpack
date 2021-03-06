# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id         :uuid             not null, primary key
#  text       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :uuid
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#

FactoryBot.define do
  factory :post do
    text { Faker::DrWho.quote }

    author { create(:user) }
  end
end
