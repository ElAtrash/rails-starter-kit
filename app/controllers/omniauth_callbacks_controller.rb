# frozen_string_literal: true

class OmniauthCallbacksController < ApplicationController
  allow_unauthenticated_access only: %i[google_oauth2 failure]

  def google_oauth2
    user = User.from_omniauth(request.env["omniauth.auth"])
    start_new_session_for user
    redirect_to after_authentication_url, notice: "Signed in with Google."
  rescue StandardError
    redirect_to new_session_path, alert: "Authentication failed. Please try again."
  end

  def failure
    redirect_to new_session_path, alert: "Authentication failed: #{params[:message].to_s.humanize}."
  end
end
