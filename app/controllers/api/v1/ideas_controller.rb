class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(idea_params)
  end

  def create
    @idea = Idea.new(idea_params)
    if @idea.save
      respond_with :api, :v1, @idea
    else
      flash[:notice] = "Something went wrong. Please try again."
    end
  end

  def destroy
    @idea = Idea.find_by(idea_params)
    @idea.delete
    respond_with Idea.all
  end

  private

  def idea_params
    params.permit(:id, :title, :body, :quality)
  end

end
