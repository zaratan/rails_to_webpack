# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe ":index" do
    subject do
      get :index
    end

    in_context :auth_guarded do
      it "returns the current user" do
        subject
        expect(json_response).to eq("user" => { "id" => test_user.id, "username" => test_user.username, "email" => test_user.email })
      end
    end
  end
end
