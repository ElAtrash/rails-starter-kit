# frozen_string_literal: true

class PasswordsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_token, only: %i[ edit update ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_password_path, alert: "Try again later." }

  def new
    render inertia: "Passwords/New"
  end

  def create
    email = params[:email_address].to_s.strip

    unless email.present?
      render inertia: "Passwords/New", props: {
        errors: { email_address: "Email address is required" }
      }, status: :unprocessable_content
      return
    end

    if user = User.find_by(email_address: email)
      PasswordsMailer.reset(user).deliver_later
      message = "Reset instructions sent! Check your email."
    else
      message = "If that email address is in our system, you'll receive password reset instructions."
    end

    render inertia: "Passwords/New", props: {
      success: message
    }
  end

  def edit
    render inertia: "Passwords/Edit", props: {
      token: params[:token]
    }
  end

  def update
    if @user.update(params.permit(:password, :password_confirmation))
      @user.sessions.destroy_all
      redirect_to new_session_path, notice: "Password has been reset."
    else
      render inertia: "Passwords/Edit", props: { token: params[:token] }, status: :unprocessable_content
    end
  end

  private
    def set_user_by_token
      @user = User.find_by_token_for(:password_reset, params[:token])
      unless @user
        redirect_to new_password_path, alert: "Password reset link is invalid or has expired."
      end
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      redirect_to new_password_path, alert: "Password reset link is invalid or has expired."
    end
end
