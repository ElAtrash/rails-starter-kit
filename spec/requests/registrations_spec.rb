# frozen_string_literal: true

RSpec.describe "Registrations", type: :request do
  describe "GET /registration/new" do
    it "renders the registration page" do
      get new_registration_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Auth/Register")
    end
  end

  describe "POST /registration" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          email_address: "newuser@example.com",
          password: "password123",
          password_confirmation: "password123"
        }
      end

      it "creates a user and redirects to root" do
        expect {
          post registration_path, params: valid_params
        }.to change(User, :count).by(1)

        expect(response).to redirect_to(root_path)
        follow_redirect!
        expect(flash[:notice]).to eq("Welcome! Your account has been created.")
      end
    end

    context "with invalid parameters" do
      it "does not create a user and returns errors" do
        expect {
          post registration_path, params: { email_address: "invalid-email" }
        }.not_to change(User, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
