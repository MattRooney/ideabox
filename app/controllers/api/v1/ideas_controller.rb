class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find_by(id: params[:id])
  end

  def create
    idea = Idea.new(idea_params)
    if idea.save
      respond_with( idea, location: api_v1_idea_path(:idea) )
    else
      render json: idea.errors, status: 422
    end
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
    respond_with Idea.update( params[:id], idea_params )
  end

  private

  def idea_params
    params.permit(:title, :body, :quality)
  end

end
