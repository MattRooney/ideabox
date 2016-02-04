require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea
  def create_idea
    @idea = Idea.new( { id: 1,
                        title: "Idea Title",
                        body: "Idea Body",
                      } )
  end


  test "Idea is valid" do
    create_idea

    assert idea.valid?
  end

  test "Idea has a title, body and quality" do
    create_idea

    assert_equal "Idea Title", idea.title
    assert_equal "Idea Body", idea.body
    assert_equal "swill", idea.quality
  end
end
