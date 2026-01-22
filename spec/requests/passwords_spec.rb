# frozen_string_literal: true

RSpec.describe "Passwords", type: :request do
  let(:user) { create(:user) }

  describe "POST /password" do
    it "sends a password reset email" do
      perform_enqueued_jobs do
        post passwords_path, params: { email_address: user.email_address }
      end

      expect(ActionMailer::Base.deliveries.size).to eq(1)
    end
  end

  describe "PUT /password" do
    let(:token) { user.generate_token_for(:password_reset) }

    context "with a valid token" do
      it "updates the password" do
        put password_path(token: token), params: {
          password: "newpassword123",
          password_confirmation: "newpassword123"
        }

        expect(response).to redirect_to(new_session_path)
        expect(user.reload.authenticate("newpassword123")).to be_truthy
      end
    end

    context "with an invalid token" do
      it "fails to update" do
        put password_path(token: "garbage"), params: {
          password: "newpassword123",
          password_confirmation: "newpassword123"
        }

        expect(response).to redirect_to(new_password_path)
      end
    end
  end
end
