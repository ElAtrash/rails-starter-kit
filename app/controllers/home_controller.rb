# frozen_string_literal: true

class HomeController < ApplicationController
  allow_unauthenticated_access only: :index

  def index
    render inertia: "Home"
  end
end
