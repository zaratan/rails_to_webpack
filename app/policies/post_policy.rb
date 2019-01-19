# frozen_string_literal: true

class PostPolicy < ApplicationPolicy
  def destroy?
    record.author_id == user.id
  end
  alias_method :update?, :destroy?
end
