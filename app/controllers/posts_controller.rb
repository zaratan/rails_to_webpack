# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @new_post = Post.new
    @posts = Post.all.order(created_at: :desc).includes(:author)
  end

  def create
    post = Post.create(create_params.merge(author: current_user))
    if post.errors.present?
      flash[:alert] = post.errors.full_messages.join(', ')
    end
    redirect_to root_path
  end

  def destroy
    post = Post.find(params[:id])
    authorize post
    post.destroy
  rescue Pundit::NotAuthorizedError
    flash[:alert] = "This is not your post"
  ensure
    redirect_to root_path
  end

  def update
    post = Post.find(params[:id])
    authorize post
    post.update(update_params)
  rescue Pundit::NotAuthorizedError
    flash[:alert] = "This is not your post"
  ensure
    redirect_to root_path
  end

  private

  def create_params
    @create_params ||= params.require(:post).permit(:text)
  end
  alias_method :update_params, :create_params
end
