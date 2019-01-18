# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts, id: :uuid do |t|
      t.text :text

      t.timestamps
    end
  end
end
