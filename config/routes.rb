# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :posts, only: %i[index create new destroy update]
  resources :users, only: %i[index]
  root to: "posts#index"
end
