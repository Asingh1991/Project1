$("#food-search").on("click", function() {
    var food = $("#food-input").val().trim();
    console.log (food)

    var queryURL = "https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=f&format=json&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    // var queryURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
        var results = response.data;

        //   for (var i = 0; i < results.length; i++) {
        //     var foodDiv = $("#nutrition-area");

        //     var nutrients = results[i].nutrients;

        //     var p = $("<p>").text("Nutrients: " + nutrients);

        //     // var personImage = $("<img>");
        //     // personImage.attr("src", results[i].images.fixed_height.url);

        //     foodDiv.prepend(p);
        //     // gifDiv.prepend(personImage);

            // $("#nutrition-area").prepend(foodDiv);
            console.log(response);
        // }
    });

    var apiKey = "Z6Tnh1gToaeIZG64YkHnhog0gv2kA36Z";
    var searchURL = "https://api.bigoven.com/recipes?title_kw="+food+"&pg=1&rpp=20&api_key=" + apiKey;
    
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: searchURL,
        success: function (res) {
            console.log(res);
            
            var hasInstruction = false;
            var x=0;
            var myRecipe = ""

            findRecipe();

            function findRecipe() {
                console.log ("called findrecipe")
                var recipeId = res.Results[x].RecipeID;
                var recipeURL = "https://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    url: recipeURL,
                    success: function (rec) {
                        myRecipe = rec.Instructions
                        if (myRecipe.includes("See above")) {
                            x++;
                            findRecipe();
                        } else if (myRecipe.includes("Instructions are at")) {
                            x++;
                            findRecipe();
                        } else if (myRecipe === "") {
                            x++;
                            findRecipe();
                        } else {
                            $("#recipe-area").text(myRecipe);
                            console.log(x)
                        }
                    }
                });
            }
            
        }
    });

});

