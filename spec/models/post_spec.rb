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

require 'rails_helper'

RSpec.describe Post, type: :model do
  subject do
    build(:post)
  end

  it "is creatable" do
    post = create(:post).reload
    expect(post.id).not_to be_nil
    expect(post.text).not_to be_nil
  end

  it "follows the links of author" do
    post = create(:post).reload
    expect(post.author.posts.first).to eq post
  end

  it { is_expected.to validate_presence_of(:text) }
  it { is_expected.to validate_presence_of(:author) }
  it { is_expected.to validate_length_of(:text).is_at_least(6) }
  it { is_expected.to belong_to(:author).class_name('User') }
end
