require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index responds to json with an array of records" do
    get :index, format: :json

    assert_response :success
    assert_kind_of Array, json_reponse
  end
end
