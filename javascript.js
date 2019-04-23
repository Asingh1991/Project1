$("#food-search").on("click", function() {
    var food = $("#food-input").val().trim();
    var api_Key = "dD7Pf7jRvGjQ4wdtk47L2KISBlUnbLbzUBVEeqkn";
    var nurSearchURL = " https://api.nal.usda.gov/ndb/search/?format=json&q=" + food + "&sort=n&max=5&offset=0&api_key=" + api_Key;
    $.ajax({
method: "GET",
dataType: "json",
url: nurSearchURL,
success: function (response) {
    console.log(response);
    console.log(response.list.item[0,3]);


}






// findNutrients();


// function fundNutrients() {
//     var nutrientId = "";
//     var nutrientsAPI = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + nutrientId + "&type=f&format=json&api_key=" + api_Key;
// }



// })
// .then(function(response) {
// //   var results = response.data;

//     // if ($("#food-input") === )


// //   for (var i = 0; i < results.length; i++) {
// //     var foodDiv = $("#nutrition-area");

//     // var nutrients = results[i].nutrients;

// //     var p = $("<p>").text("Nutrients: " + nutrients);

// // //     // var personImage = $("<img>");
// // //     // personImage.attr("src", results[i].images.fixed_height.url);

// //     foodDiv.prepend(p);
// //     // gifDiv.prepend(personImage);

    // $("#nutrition-area").prepend(response);
    
},
console.log(food),
// console.log(response),
)});
// });