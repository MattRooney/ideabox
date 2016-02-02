require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index responds to json with an array of records" do
    get :index, format: :json

    assert_response :success
    assert_kind_of Array, json_reponse
  end

  test "#index returns the correct number of ideas" do
    get :index, format: :json

    assert_equal Idea.count, json_reponse.count
  end

  test "#index contains ideas with titles, bodies and qualities" do
    get :index, format: :json

    json_reponse.each do |idea|
      assert idea["title"]
      assert idea["body"]
      assert idea["quality"]
    end
  end

  test "#show responds to json with a hash record" do
    get :show, format: :json, id: Idea.first.id

    assert_response :success
    assert_kind_of Hash, json_reponse
  end

  test "#show contains an idea with a title, body and quality" do
    get :show, format: :json, id: Idea.first.id

    assert_equal Idea.first.id, json_reponse["id"]
    assert_equal Idea.first.title, json_reponse["title"]
    assert_equal Idea.first.body, json_reponse["body"]
    assert_equal Idea.first.quality, json_reponse["quality"]
  end

  test "#create adds an idea to the database" do
    idea = { title: "New Idea", body: "Such a great idea" }

    assert_difference 'Idea.count', 1 do
      post :create, idea: idea, format: :json
    end
  end

  test "#create creates an idea with the correct properties, including quality" do
    idea = { title: "New Idea", body: "Such a great idea", quality: "swill" }

    post :create, idea: idea, format: :json

    assert_equal idea[:title], json_reponse["title"]
    assert_equal idea[:body], json_reponse["body"]
    assert_equal idea[:quality], json_reponse["quality"]
  end

  test "#destroy removes an idea from the database" do
    idea = { title: "New Idea", body: "Such a great idea", quality: "swill" }
    post :create, idea: idea, format: :json

    assert_equal idea[:title], json_reponse["title"]

    assert_difference 'Idea.count', -1 do
      delete :destroy, id: Idea.last.id, format: :json
    end
  end
end
