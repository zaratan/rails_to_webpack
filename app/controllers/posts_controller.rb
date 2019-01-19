# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized_error
  rescue_from ActiveRecord::RecordInvalid, with: :rescue_bad_params

  def index
    @new_post = Post.new
    @posts = Post.all.order(created_at: :desc).includes(:author)
  end

  def create
    Post.create!(create_params.merge(author: current_user))
    redirect_to root_path
  end

  def destroy
    post = Post.find(params[:id])
    authorize post
    post.destroy
    redirect_to root_path
  end

  def update
    post = Post.find(params[:id])
    authorize post
    post.update!(update_params)
    redirect_to root_path
  end

  private

  def create_params
    @create_params ||= params.require(:post).permit(:text)
  end
  alias_method :update_params, :create_params

  def not_authorized_error
    flash[:alert] = "This is not your post"
    redirect_to(root_path)
  end

  def record_not_found
    flash[:alert] = "The post doesn't exist"
    redirect_to(root_path)
  end

  def rescue_bad_params(exception)
    flash[:alert] = exception.record.errors.full_messages.join(", ")
    redirect_to(root_path)
  end
end
