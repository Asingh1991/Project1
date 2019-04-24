// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeypzJLuLgZiY62Ixp1Bxli8OKd3llLvk",
    authDomain: "mainproject-a2b33.firebaseapp.com",
    databaseURL: "https://mainproject-a2b33.firebaseio.com",
    projectId: "mainproject-a2b33",
    storageBucket: "mainproject-a2b33.appspot.com",
    messagingSenderId: "84996690476"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#food-search").on("click", function () {
    var food = $("#food-input").val().trim();
    console.log(food)

    var queryURL = "https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=f&format=json&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    // var queryURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
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
    var searchURL = "https://api.bigoven.com/recipes?title_kw=" + food + "&pg=1&rpp=20&api_key=" + apiKey;

    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: searchURL,
        success: function (res) {
            console.log(res);

            var hasInstruction = false;
            var x = 0;
            var myRecipe = ""

            findRecipe();

            function findRecipe() {
                console.log("called findrecipe")
                var recipeId = res.Results[x].RecipeID;
                var recipeURL = "https://api.bigoven.com/recipe/" + recipeId + "?api_key=" + apiKey;
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    url: recipeURL,
                    success: function (rec) {
                        console.log(rec);
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
    var youtubekey = "AIzaSyAtSGVtAdUV7TGOoO2KZhAdSMIFmrrduTU";
    var q = food;
    var youtubeURL = "https://www.googleapis.com/youtube/v3/search";

    var options = {
        part: 'snippet',
        key: youtubekey,
        maxResults: 1,
        q: 'how to make best' + q
    }
    console.log(q);
    loadVids();

    function loadVids() {
        $.getJSON(youtubeURL, options, function (info) {
            console.log(info);
            var id = info.items[0].id.videoId;
            mainVid(id);
        });
    }
    function mainVid(id) {
        $('#video-area').html(`
          <iframe width="400" height="200"
          src="https://www.youtube.com/embed/${id}" 
          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
        );

    };


    var name = food;
    var TotalKcal = "";
    var Protein  =""; 
    var Carbohydrates ="";
    var Fat ="";

    var foodfirebase = {
        name: name,
        TotalKcal : TotalKcal,
        Protein : Protein,
        Carbohydrates :Carbohydrates,
        Fat : Fat,
    };

    database.ref().push(foodfirebase);
    // Clears all of the text-boxes
    $("#food-input").val("");
    $("#nutrition-area").val("");
    $("#nutrition-area").val("");
    $("#nutrition-area").val("");
    $("#nutrition-area").val("");

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var name = childSnapshot.val().name;
        var TotalKcal = childSnapshot.val().TotalKcal;
        var Protein =  childSnapshot.val().Protein;
        var Carbohydrates =  childSnapshot.val().Carbohydrates;
        var Fat =  childSnapshot.val().Fat;
        
        console.log(name);
        console.log(TotalKcal);
        console.log(Protein);
        console.log(Carbohydrates);
        console.log(Fat);

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(TotalKcal),
            $("<td>").text(Protein),
            $("<td>").text(Carbohydrates),
            $("<td>").text(Fat),
            

        );
        $("#results-area > tbody").append(newRow);
    });

});
