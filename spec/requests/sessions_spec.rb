# frozen_string_literal: true

RSpec.describe "Sessions", type: :request do
  let!(:user) { create(:user, email_address: "login@example.com", password: "password123") }

  describe "POST /session" do
    it "authenticates the correct user and redirects" do
      aggregate_failures "testing session creation" do
        post session_path, params: {
          email_address: user.email_address,
          password: user.password
        }

        expect(response).to redirect_to(root_path)

        latest_session = Session.last
        expect(latest_session).not_to be_nil
        expect(latest_session.user_id).to eq(user.id)
      end
    end

    it "shows an alert with incorrect credentials" do
      post session_path, params: { email_address: "login@example.com", password: "wrongpassword" }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(flash[:alert]).to eq("Invalid email or password.")
    end
  end

  describe "DELETE /session" do
    it "logs out the user" do
      post session_path, params: { email_address: "login@example.com", password: "password123" }

      delete session_path
      expect(response).to redirect_to(new_session_path)
      follow_redirect!
      expect(flash[:notice]).to be_present
    end
  end
end
