
var config = {
    apiKey: "AIzaSyCTc1mIcuSu43Y0xiPQ5xP6DMFPZVXMDBI",
    authDomain: "project1-da1bb.firebaseapp.com",
    databaseURL: "https://project1-da1bb.firebaseio.com",
    projectId: "project1-da1bb",
    storageBucket: "project1-da1bb.appspot.com",
    messagingSenderId: "296689117084"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$("#food-input").on('keyup', function (e) {
    if (e.keyCode == 13) {
        updateAll();
    }
});



$("#food-search").on("click", function() {
    updateAll();
});

function updateAll() {
    var food = $("#food-input").val().trim();

    $("#nutrition-data").empty();

    $("#food-input").val("");
    $("#results-area").empty();


    var api_Key = "dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    var nurSearchURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=" + api_Key;


    $("#recipe-area").html("<h4 class = 'text-center'>Recipe</h4>");
    $("#ingredients-area").html("<h4 class = 'text-center'>Ingredients</h4>");

    var queryURL = "https://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=f&format=json&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    // var queryURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";

    $.ajax({
method: "GET",
dataType: "json",
url: nurSearchURL,
success: function (response) {
    // console.log(response);
    console.log(response.list.item[0].ndbno);


    findNutrients();


function findNutrients() {
    var nutrientId = response.list.item[0].ndbno;
    var nutrientsAPI = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + nutrientId + "&type=f&format=json&api_key=" + api_Key;
   

    $.ajax({
        method: "GET",
        dataType: "json",
        url: nutrientsAPI,
        success: function (nutrients) {
    //         console.log(reports.food.nutrients);
            // console.log("nutrients=" + nutrients);
          
            var nutrientFact = nutrients.report.food.nutrients;
            // $("#nutrition-area").append(nutrientFact);
            console.log(nutrientFact);

            var totalKcal = nutrientFact[0].value;
            console.log(totalKcal);

            var protein = nutrientFact[1].value;
            console.log(protein);

            var carbohydrates = nutrientFact[3].value;
            console.log(carbohydrates);

            var fat = nutrientFact[2].value;
            console.log(fat);


            var newRow = $("#nutrition-data").append(
                $("<td>").text(totalKcal),
                $("<td>").text(protein),
                $("<td>").text(carbohydrates),
                $("<td>").text(fat),
               
            );
                $("#nutriton-area").append(newRow);
            
            
        }
        

    });

}
}
    

});


    var apiKey = "Z6Tnh1gToaeIZG64YkHnhog0gv2kA36Z";
    var searchURL = "https://api.bigoven.com/recipes?title_kw="+food+"&pg=1&rpp=20&api_key=" + apiKey;
    
    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: searchURL,
        success: function (res) {
            
            var x=0;
            var myRecipe = ""

            findRecipe();

            function findRecipe() {
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
                        } else if (myRecipe.includes("é") || myRecipe.includes("à") ) {
                            x++;
                            findRecipe();
                        } else if (myRecipe.includes("Instructions")) {
                            x++;
                            findRecipe();
                        } else if (myRecipe === "") {
                            x++;
                            findRecipe();
                        } else {
                            for (var y = 0; y < rec.Ingredients.length; y++) {
                                $("#ingredients-area").append("<br>" + rec.Ingredients[y].Quantity + " " + rec.Ingredients[y].Unit + " " + rec.Ingredients[y].Name)
                            }
                            $("#recipe-area").append(myRecipe);
                            $("#recipe-area").append(myRecipe);
                        }
                    }
                });
            }
            
        }
    });
    var youtubekey = "AIzaSyAd1UZxzbwiLCyOwLYGrkdOxpT5_Euj5h0";
    var q = food;
    var youtubeURL = "https://www.googleapis.com/youtube/v3/search";
    
    var options = {
        part: 'snippet',
        key: youtubekey,
        maxResults: 1,
        q: 'how to make best' + q
    }
    console.log(q);
    loadVids ();
    
    function loadVids () {
        $.getJSON(youtubeURL, options, function(info){
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

          var firesbaseurl = "https://www.youtube.com/watch?v="+id;

          $("#food-input").val("");
          
      
          database.ref().push({
              name: food,
              firebaseurl: firesbaseurl
          });
          
          database.ref().on("child_added", function(snapshot) {
          var name = snapshot.val().name;
          var video = snapshot.val().firebaseurl;
          $("#results-area").prepend("<tr><td>" + name + "</td><td><a href=" + video + ">"+ video +"</a></td><td>" );
  
        });
    };
    
};
