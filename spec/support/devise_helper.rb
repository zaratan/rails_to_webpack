# frozen_string_literal: true

module DeviseHelper
  def test_user
    @test_user ||= build(:user)
  end

  def sign_in_fake(user = test_user)
    if user.nil?
      allow(request.env['warden']).to receive(:authenticate!).and_throw(:warden, scope: :user)
      allow(controller).to receive(:current_user).and_return(nil)
    else
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
    end
  end
end

RSpec.define_context :auth_guarded, ns: 'devise' do
  context "without authentication" do
    it "reject the user" do
      expect(subject).to redirect_to(new_user_session_path)
    end
  end

  context "with authenticated user" do
    before { sign_in_fake }

    execute_tests
  end
end
