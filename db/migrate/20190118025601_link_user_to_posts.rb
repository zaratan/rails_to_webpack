# frozen_string_literal: true

class LinkUserToPosts < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :author, foreign_key: { to_table: :users }, type: :uuid
  end
end
