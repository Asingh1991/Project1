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
            console.log(nutrients);

            $("#nutrition-area").text(nutrients);
        }
        
    });

}
}
    });

})
// }
// console.log(food),
// console.log(response),
    
// }
// })
// });