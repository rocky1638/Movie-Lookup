$(document).ready(function() {

  /**
  TO DO LIST
      Back Button *done for now
      Link to reviews
      Learn More Button
        Runtime
        Director
        Cast
      Recommended Movies
      Fix glitch when there are no ratings (try/catch?)
  **/

  var $body = $("body");
  var $mainContainer = $("div.container-fluid");
  var $mainHeader = $("h1.main-header");

  var $searchRow = $("div.search-row");
  var $searchCol = $("div.search-col");
  var $searchForm = $("form.search-form");
  var $searchInput = $("input.search-input");
  var $searchButton = $("button.search-button");

  var $infoDiv = $("<div>").addClass("info-div");

  function infoDivStyling() {
    var w = $(window).width();
    if (w > 1000) {
      console.log("big");
      $infoDiv.css({
        "marginLeft": "35%",
        "marginRight": "35%",
        "marginBottom": "2%",
        "backgroundColor": "#F1F1D4",
        //"backgroundColor": "#dddead",
        //"backgroundColor": "#dddeb0",
        "borderRadius": "5px"
      }).css("box-shadow", "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)");
    } else if (w < 1000) {
      console.log("small");
      $infoDiv.css({
        "marginLeft": "2%",
        "marginRight": "2%",
        "marginBottom": "2%",
        "backgroundColor": "#F1F1D4",
        "borderRadius": "5px"
      }).css("box-shadow", "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)");
    }
  }
  infoDivStyling();

  $searchForm.on("submit", function(e) {
    // Prevent refresh
    e.preventDefault();
    // Call OMDB API
    $.ajax({
      method: "GET",
      url: "http://www.omdbapi.com/?apikey=112fd10d&t=" + encodeURIComponent($searchInput.val()),
      datatype: "json"
    }).then(function(response) {
      displayData(response);
    }).catch(function(error) {
      console.log(error);
    }).then(function() {
      $searchInput.val('');
    })
  });

  $searchButton.on("click", function(e) {
    // Prevent refresh
    e.preventDefault();
    // Call OMDB API
    $.ajax({
      method: "GET",
      url: "http://www.omdbapi.com/?apikey=112fd10d&t=" + encodeURIComponent($searchInput.val()),
      datatype: "json"
    }).then(function(response) {
      displayData(response);
    }).catch(function(error) {
      console.log(error);
    }).then(function() {
      $searchInput.val('');
    })
  })

  function displayData(object) {
    console.log(object);

    // If movie isn't found
    if (object.Error) {
      alert("Movie Not Found!");

      // Movie is found
    } else {
      // Clear Search Screen
      $mainContainer.empty();

      // Add Back Button
      var $backRow = $("<div>").addClass("row back-row");
      var $backCol = $("<div>").addClass("col-xs-12 center-text");
      var $back = $("<a>").text("Return to search").css({
        "font-size": "10px",
        "cursor": "pointer"
      });

      $back.on("click", function(e) {
        e.stopPropagation();
        location.reload();
      })
      $back.on("mouseenter", function(e) {
        e.stopPropagation();
        $back.css("color", "blue");
      })
      $back.on("mouseleave", function(e) {
        e.stopPropagation();
        $back.css("color", "black");
      })

      // Add Title
      var $titleRow = $("<div>").addClass("row title-row");
      var $titleCol = $("<div>").addClass("col-xs-12 col-sm-8 col-sm-offset-2");
      var $title = $("<h1>").text(object.Title).css({
        "marginTop": "35px",
        "marginBottom": "0px"
      });

      // Add Poster
      var $posterRow = $("<div>").addClass("row poster-row");
      var $posterCol = $("<div>").addClass("poster-col col-xs-12 center-text");
      var $poster = $("<img/>").attr("src", object.Poster);

      // Add Ratings
      var checkForRating = function(index) {
        if (object.Ratings[index].Value) {
          return object.Ratings[index].Value;
        } else {
          return "N/A";
        }
      }

      var $ratingsRow = $("<div>").addClass("row ratings-row");
      var $imdbCol = $("<div>").addClass("col-xs-4 col-xs-offset-2 imdb-col center-text");
      var $imdbLogo = $("<img>").attr("src", "imdb_long.png").css("width", "30px");
      var $imdbRating = $("<p>").text(checkForRating(0))
        .css("display", "inline-block").css("margin", "5px");

      var $rottenTomatoesCol = $("<div>").addClass("col-xs-4 col-xs-offset-2 rotten-tomatoes-col center-text")
        .css("display", "inline-block").css("margin", "5px");
      var $rottenTomatoesLogo = $("<img>").attr("src", "rotten_tomatoes.png").css("width", "30px");
      var $rottenTomatoesRating = $("<p>");
      $rottenTomatoesRating.text(checkForRating(1)).css("display", "inline-block");

      console.log(($rottenTomatoesRating).text());

      $rottenTomatoesCol.append($rottenTomatoesLogo).append($rottenTomatoesRating);
      $imdbCol.append($imdbLogo).append($imdbRating);

      // Add Info
      var $infoRow = $("<div>").addClass("row info-row");
      var $infoCol = $("<div>").addClass("col-xs-12 col-sm-10 col-sm-offset-1 info-col").css("text-align", "center");
      var $synopsis = $("<p>").text(object.Plot).css({
        "paddingLeft": "10px",
        "paddingRight": "10px",
        "marginBottom": "25px"
      });
      // Add More Info Button
      function createMoreInfoInterface() {
        var $moreInfoRow = $("<div>").addClass("row more-info-row");
        var $moreInfoCol = $("<div>").addClass("col-xs-12 more-info-col center-text");
        var $arrowCol = $("<div>").addClass("col-xs-12 arrow-col center-text");
        var $arrow = $("<img>").attr("src", "down-arrow.png").css({
          "width": "30px",
          "cursor": "pointer"
        });
        var $moreInfo = $("<p>").text("More Info").css({
          "marginBottom": "0px"
        });

        $arrow.on("mouseenter", function(e) {
          e.stopPropagation();
          $arrow.css("opacity", "0.5");
        });
        $arrow.on("mouseleave", function(e) {
          e.stopPropagation();
          $arrow.css("opacity", "1");
        });
        $arrow.on("click", function(e) {
          e.stopPropagation();
          // Remove Button
          $moreInfoRow.remove();
          // Add Horizontal Line Break
          var $line = $("<hr>").addClass("line-style");
          $line.css({
            "color": "black",
            "marginTop": "0px",
            "marginBottom": "0px"
          });
          $infoDiv.append($line);
          // Show More Info
          showMoreInfo(object);
        });
        // Append More Info Link
        console.log("test");
        $moreInfoCol.append($moreInfo);
        $arrowCol.append($arrow);
        $moreInfoRow.append($moreInfoCol).append($arrowCol);
        $infoDiv.append($moreInfoRow);
      }
      /** Append Everything **/
      // Append Info Div
      $mainContainer.append($infoDiv);
      // Append Title
      $titleCol.append($title);
      $titleRow.append($titleCol);
      $infoDiv.append($titleRow);

      // Append back button
      $backCol.append($back);
      $backRow.append($backCol);
      $infoDiv.append($backRow);
      // Append Poster
      $posterCol.append($poster);
      $posterRow.append($posterCol);
      $infoDiv.append($posterRow);
      // Append Ratings
      $ratingsRow.append($imdbCol);
      $ratingsRow.append($rottenTomatoesCol);
      $infoDiv.append($ratingsRow);
      // Append Info
      $infoCol.append($synopsis);
      $infoRow.append($infoCol);
      $infoDiv.append($infoRow);

      createMoreInfoInterface();

    }

    function showMoreInfo(object) {
      var $moreInfoRow = $("row.more-info-row");
      // Add More Info Header
      var $moreInfoHeaderRow = $("<div>").addClass("row more-info-header-row center-text");
      var $moreInfoHeaderCol = $("<div>").addClass("col-xs-12 more-info-header-col center-text");
      var $moreInfoHeader = $("<h2>").text("More Info").addClass("more-info-header").css({
        "fontSize": "25px",
        "marginBottom": "20px"
      });
      // Add Info Row
      var $infoRow = $("<div>").addClass("row info-row");
      // Add Data
      var $runtime = $("<div>").text("Runtime: " + object.Runtime).addClass("col-xs-12 center-text runtime");
      var $director = $("<div>").text("Director: " + object.Director).addClass("col-xs-12 center-text director");
      var $year = $("<div>").text("Release Year: " + object.Year).addClass("col-xs-12 center-text year");

      // Add Less Info Button
      var $lessInfoRow = $("<div>").addClass("row less-info-row");
      var $lessInfoCol = $("<div>").addClass("col-xs-12 less-info-col center-text");
      var $lessInfo = $("<p>").addClass("less-info").text("Less Info").css({
        "marginBottom": "0px",
        "marginTop": "20px"
      });
      var $upArrowCol = $("<div>").addClass("col-xs-12 up-arrow-col center-text");
      var $upArrow = $("<img>").attr("src", "up-arrow.png").css("width", "33px");

      $upArrow.on("click", function(e) {
        var $line = $("hr.line-style");

        e.stopPropagation();

        $lessInfoRow.remove();
        $infoRow.remove();
        $moreInfoHeaderRow.remove();
        $line.remove();
        createMoreInfoInterface();
      })
      $upArrow.on("mouseenter", function(e){
        e.stopPropagation();
        $upArrow.css("opacity", "0.5");
      })
      $upArrow.on("mouseleave", function(e){
        e.stopPropagation();
        $upArrow.css("opacity", "1");
      })

      /** Append Everything **/
      // Append More Info Header
      $moreInfoHeaderCol.append($moreInfoHeader);
      $moreInfoHeaderRow.append($moreInfoHeaderCol);
      $infoDiv.append($moreInfoHeaderRow);
      // Append Info Columns
      $infoRow.append($runtime);
      $infoRow.append($director);
      $infoRow.append($year);
      // Append Less Info Button
      $upArrowCol.append($upArrow);
      $lessInfoCol.append($lessInfo);
      $lessInfoRow.append($lessInfoCol).append($upArrowCol);
      // Append to main div
      $infoDiv.append($infoRow);
      $infoDiv.append($lessInfoRow);

      // replace with Less Info+UpArrow
    }
  }
})
