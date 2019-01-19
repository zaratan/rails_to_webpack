# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized_error
  rescue_from ActiveRecord::RecordInvalid, with: :rescue_bad_params

  def index
    @posts = Post.all.order(created_at: :desc).includes(:author)
    respond_to do |format|
      format.html do
        @new_post = Post.new
      end
      format.json do
        render json: @posts
      end
    end
  end

  def create
    post = Post.create!(create_params.merge(author: current_user))
    respond_to do |format|
      format.html do
        redirect_to root_path
      end
      format.json do
        render json: post
      end
    end
  end

  def destroy
    post = Post.find(params[:id])
    authorize post
    post.destroy
    respond_to do |format|
      format.html do
        redirect_to root_path
      end
      format.json do
        render json: post
      end
    end
  end

  def update
    post = Post.find(params[:id])
    authorize post
    post.update!(update_params)
    respond_to do |format|
      format.html do
        redirect_to root_path
      end
      format.json do
        render json: post
      end
    end
  end

  private

  def create_params
    @create_params ||= params.require(:post).permit(:text)
  end
  alias_method :update_params, :create_params

  def not_authorized_error
    respond_to do |format|
      format.html do
        flash[:alert] = "This is not your post"
        redirect_to(root_path)
      end
      format.json do
        render json: { errors: ["This is not your post"] }
      end
    end
  end

  def record_not_found
    respond_to do |format|
      format.html do
        flash[:alert] = "The post doesn't exist"
        redirect_to(root_path)
      end
      format.json do
        render json: { errors: ["The post doesn't exist"] }
      end
    end
  end

  def rescue_bad_params(exception)
    respond_to do |format|
      format.html do
        flash[:alert] = exception.record.errors.full_messages.join(", ")
        redirect_to(root_path)
      end
      format.json do
        render json: { errors: exception.record.errors.full_messages }
      end
    end
  end
end
