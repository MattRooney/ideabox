function searchIdeas() {
  $('#search').keyup(function(event) {
    var searchParam = $(this).val().toLowerCase();
    var ideas = $('#ideas-index').children();
    ideas.removeClass('invisible');

    var hideIdeas = ideas.filter(function() {
      var titleAndBody = $(this).find(".idea-title, .idea-body").text().toLowerCase();
      return !(titleAndBody.includes(searchParam))
    })
    hideIdeas.addClass('invisible');
  })
}
