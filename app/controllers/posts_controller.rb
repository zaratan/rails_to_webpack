# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized_error
  rescue_from ActiveRecord::RecordInvalid, with: :rescue_bad_params

  def index
    @posts = Post.all.order(created_at: :desc).includes(:author)
    respond_to do |format|
      format.html {}
      format.json do
        render json: @posts
      end
    end
  end

  def create
    post = Post.create!(create_params.merge(author: current_user))
    render json: post
  end

  def destroy
    post = Post.find(params[:id])
    authorize post
    post.destroy
    render json: post
  end

  def update
    post = Post.find(params[:id])
    authorize post
    post.update!(update_params)
    render json: post
  end

  private

  def create_params
    @create_params ||= params.require(:post).permit(:text)
  end
  alias_method :update_params, :create_params

  def not_authorized_error
    render json: { errors: ["This is not your post"] }
  end

  def record_not_found
    render json: { errors: ["The post doesn't exist"] }
  end

  def rescue_bad_params(exception)
    render json: { errors: exception.record.errors.full_messages }
  end
end
