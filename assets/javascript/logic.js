$("#food-search").on("click", function() {
    var food = $("#food-input").val().trim();
    var api_Key = "dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    var nurSearchURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=" + api_Key;
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
    };
    
    });


