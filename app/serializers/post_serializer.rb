# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :text

  belongs_to :author, serializer: AuthorSerializer
end
