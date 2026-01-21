# frozen_string_literal: true

class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_path, alert: "Try again later." }

  def new
    render inertia: "Auth/Login"
  end

  def create
    if user = User.authenticate_by(session_params)
      start_new_session_for user
      redirect_to after_authentication_url
    else
      flash.now[:alert] = "Invalid email or password."
      render inertia: "Auth/Login", status: :unprocessable_content
    end
  end

  def destroy
    terminate_session
    redirect_to new_session_path, notice: "Signed out successfully"
  end

  private

  def session_params
    params.permit(:email_address, :password)
  end
end
