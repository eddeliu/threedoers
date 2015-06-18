(function() {
  $(document).ready(function() {
    var panels, panelsButton;
    panels = $(".user-infos");
    panelsButton = $(".dropdown-user");
    panels.hide();
    panelsButton.click(function() {
      var currentButton, dataFor, idFor;
      dataFor = $(this).attr("data-for");
      idFor = $("." + dataFor);
      currentButton = $(this);
      return idFor.slideToggle(400, function() {
        if (idFor.is(":visible")) {
          return currentButton.html("<i class=\"glyphicon glyphicon-chevron-up text-muted\"></i>");
        } else {
          return currentButton.html("<i class=\"glyphicon glyphicon-chevron-down text-muted\"></i>");
        }
      });
    });
    $("[data-toggle=\"tooltip\"]").tooltip();
    return $("button").click(function(e) {
      e.preventDefault();
      return alert("This is a demo.\n :-)");
    });
  });

}).call(this);
