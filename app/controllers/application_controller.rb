# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # Used by devise. No testing.
  # :nocov:
  def configure_permitted_parameters
    added_attrs = %i[username email password password_confirmation remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
  # :nocov:
end
