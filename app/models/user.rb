# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password validations: false
  has_many :sessions, dependent: :destroy

  generates_token_for :password_reset, expires_in: 15.minutes do
    password_salt&.last(10)
  end

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, confirmation: true, length: { minimum: 8 }, on: :create, if: :password_required?

  def self.from_omniauth(auth)
    user = find_or_initialize_by(provider: auth.provider, uid: auth.uid)
    user.email_address = auth.info.email
    user.save!
    user
  rescue ActiveRecord::RecordInvalid => e
    raise unless e.record.errors.of_kind?(:email_address, :taken)

    # Email already taken by a non-OAuth user — link the accounts
    user = find_by!(email_address: auth.info.email)
    user.update!(provider: auth.provider, uid: auth.uid)
    user
  end

  private

  def password_required?
    provider.blank?
  end
end
