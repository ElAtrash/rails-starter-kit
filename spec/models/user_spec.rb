# frozen_string_literal: true

RSpec.describe User, type: :model do
  describe ".from_omniauth" do
    let(:auth) do
      OmniAuth::AuthHash.new(
        provider: "google_oauth2",
        uid: "123456",
        info: { email: "oauth@example.com" }
      )
    end

    it "creates a new user from OAuth data" do
      expect { described_class.from_omniauth(auth) }.to change(described_class, :count).by(1)

      user = described_class.last
      expect(user.provider).to eq("google_oauth2")
      expect(user.uid).to eq("123456")
      expect(user.email_address).to eq("oauth@example.com")
    end

    it "links an existing email user to an OAuth account" do
      existing = create(:user, email_address: "oauth@example.com")

      expect { described_class.from_omniauth(auth) }.not_to change(described_class, :count)

      existing.reload
      expect(existing.provider).to eq("google_oauth2")
      expect(existing.uid).to eq("123456")
    end

    it "finds a returning OAuth user" do
      described_class.from_omniauth(auth)

      expect { described_class.from_omniauth(auth) }.not_to change(described_class, :count)
    end
  end
end
