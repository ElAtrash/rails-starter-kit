# frozen_string_literal: true

class RegistrationsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]

  def new
    render inertia: "Auth/Register"
  end

  def create
    user = User.new(registration_params)

    if user.save
      start_new_session_for user
      redirect_to root_path, notice: "Welcome! Your account has been created."
    else
      render inertia: "Auth/Register", status: :unprocessable_content
    end
  end

  private

  def registration_params
    params.permit(:email_address, :password, :password_confirmation)
  end
end
