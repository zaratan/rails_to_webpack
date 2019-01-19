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

class Post < ApplicationRecord
  validates :text, presence: true, length: { minimum: 6 }
  validates :author, presence: true

  belongs_to :author, class_name: 'User'
end
