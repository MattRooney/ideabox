function renderIdea(idea) {
  $("#ideas-index").prepend(
    "<div class='idea bg-info' data-id='"
    + idea.id
    + "'><p>Created on "
    + idea.created_at
    + "</p><p>Title: </p><h4 contentEditable=true class='edit idea-title'>"
    + idea.title
    + "</h4><p>Description: </p><h5 contentEditable=true class='edit idea-body'>"
    + truncateIdeaBody(idea.body)
    + "</h5><p>Quality: <span class='idea-quality'>"
    + idea.quality
    + "</span></p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger btn-xs danger'>Delete</button> "
    + "<button name='button-up' class='thumbs-up glyphicon glyphicon-thumbs-up btn-success'></button> "
    + "<button name='button-down' class='thumbs-down glyphicon glyphicon-thumbs-down btn-primary'>  </button> "
    + "</div>"
    + "<br>"
  )
}
