# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user
  end
end
