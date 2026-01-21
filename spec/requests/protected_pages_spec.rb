# frozen_string_literal: true

RSpec.describe "Protected Pages", type: :request do
  it "redirects to login when visiting root while unauthenticated" do
    get root_path
    expect(response).to redirect_to(new_session_path)
  end
end
