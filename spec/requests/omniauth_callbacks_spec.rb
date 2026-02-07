# frozen_string_literal: true

RSpec.describe "OmniAuth Callbacks", type: :request do
  before do
    OmniAuth.config.test_mode = true
  end

  after do
    OmniAuth.config.test_mode = false
    OmniAuth.config.mock_auth[:google_oauth2] = nil
  end

  describe "GET /auth/google_oauth2/callback" do
    context "with valid credentials" do
      before do
        OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
          provider: "google_oauth2",
          uid: "123456",
          info: { email: "google@example.com" }
        )
      end

      it "creates a user and signs them in" do
        expect {
          get "/auth/google_oauth2/callback"
        }.to change(User, :count).by(1)
          .and change(Session, :count).by(1)

        expect(response).to redirect_to(root_url)
        expect(flash[:notice]).to eq("Signed in with Google.")
      end

      it "signs in a returning OAuth user" do
        User.from_omniauth(OmniAuth.config.mock_auth[:google_oauth2])

        expect {
          get "/auth/google_oauth2/callback"
        }.not_to change(User, :count)

        expect(response).to redirect_to(root_url)
      end
    end

    context "with failed authentication" do
      before do
        OmniAuth.config.mock_auth[:google_oauth2] = :invalid_credentials
      end

      it "redirects to login with an error" do
        get "/auth/failure", params: { message: "invalid_credentials" }

        expect(response).to redirect_to(new_session_path)
        expect(flash[:alert]).to include("Invalid credentials")
      end
    end
  end
end
