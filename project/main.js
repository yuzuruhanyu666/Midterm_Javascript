var map = L.map('map', {
  center: [40.000, -75.1590],
  zoom: 11
});

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);


 var slides = [
   {title: "Introduction", description: "There are over 6,000 places to dine in Philadelphia, emphasizing their importance to the way we eat and the need to have healthy options while eating out. However, the number of restaurants in different block groups does vary a lot in Philadelphia. The range of the number of restaurants in each block group is from 0 to 136 and it’s really hard to visualize with the specific number for each block group. Therefore, I use the quantile classification to divide them into five categories which are 0, 1-2, 3-4, 5-8 and more than 8. As shown in the map, the darker blue is, the more restaurants are. While the lighter yellow is, the less restaurants are. It's meaningful to do this analysis to help planners and city decide where to develop restaurants in the future.", color: "#FFFFFF" },
   { title: "Restaurants more than eight", description: "As shown in the map, the darker blue block groups represent the area with more than eight restaurants, considered as the highest category. The majority are located in the Center City and Lower South neighbourhood.", color: "#FFFFFF"},
   { title: "Restaurants ranging from five to eight", description: "The blue ones are block groups with five to eight restaurants, considered as the second highest category. They are distributed evenly in Philadelphia and not obviously concerntated in one neighborhood.", color: "#FFFFFF" },
   { title: "Restaurants ranging from three to four", description: "The lighter blue ones represnts the block group with three or four restaurants, considered as the medium category. Similarly, these selected block groups are distributed evenly.", color: "#FFFFFF" },
   { title: "Restaurants ranging from one to two", description: "Green ones show that they have one or two restaurants, regared as the second lowest category. They have the pattern of relatively higher density in the Northern and Western part of Philadelphia.", color: "#FFFFFF" },
   { title: "No restaurants", description: "The shown block groups have no restaurants. Zoom in to the Center City, it's interesting to see that these blocks have moderate or high access to high-produce supply stores. However, there are no restaurants in these areas. The future plan can focus on these block groups of investing or developing restaurants to satisfy the easy access living style.", color: "#FFFFFF" }
 ];

 var currentSlide = 0;
 /* =====================
  Read the element in slides
 ===================== */
 var loadSlide = function(slide) {
   $('#title2').text(slide.title);
   $('#description').text(slide.description);
   $('#sidebar').css("background-color", slide.color);
 };

 /* =====================
  Set the next nutton function
 ===================== */
 var next = function() {
   if (currentSlide == slides.length - 1) {
   } else {
     $("#previousButton").css("visibility", "visible");
     $("#nextButton").css('visibility','visible');
     currentSlide = currentSlide + 1;
     loadSlide(slides[currentSlide]);
   }
   if (currentSlide == 1){
     if(featureGroup){
     map.removeLayer(featureGroup); // remove the old polygon...
    }
    secondMap();
   }
   else if (currentSlide == 2){
     if(featureGroup){
     map.removeLayer(featureGroup);
    }
    thirdMap();
   }
   else if (currentSlide == 3){
     if(featureGroup){
     map.removeLayer(featureGroup);
    }
    forthMap();
   }
   else if (currentSlide == 4){
     if(featureGroup){
     map.removeLayer(featureGroup);
    }
    fifthMap();
   }
   else if (currentSlide == 5){
     if(featureGroup){
     map.removeLayer(featureGroup);
    }
    sixthMap();
   }

   if (currentSlide == slides.length - 1) {
     $('#nextButton').css('visibility','hidden');
   }
 };

 /* =====================
  Set the previous nutton function
 ===================== */
 var previous = function(){
   if(currentSlide == 0){
   }else{
     $("#previousButton").css("visibility", "visible");
     $("#nextButton").css('visibility','visible');
     currentSlide = currentSlide - 1;
     loadSlide(slides[currentSlide]);

     if (currentSlide == 1){
       if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
      }
      secondMap();
     }
     else if (currentSlide == 2){
       if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
      }
      thirdMap();
     }
     else if (currentSlide == 3){
       if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
      }
      forthMap();
     }
     else if (currentSlide == 4){
       if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
      }
      fifthMap();
     }
    else if (currentSlide == 5){
       if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
      }
      sixthMap();
     }
   }

   if(currentSlide == 0){
     $('#previousButton').css('visibility','hidden');
     $('#nextButton').css('visibility','visible');

    if(featureGroup){
       map.removeLayer(featureGroup); // remove the old polygon...
    }
      initial();
    }

 };

 /* =====================
  Click on the button
 ===================== */
 $('#nextButton').click(function(e) {
   next();
 });

 $('#previousButton').click(function(a){
   previous();
 });



 var dataset = "https://raw.githubusercontent.com/yuzuruhanyu666/Midterm_Javascript/master/NeighborhoodFoodRetail.geojson";
 var featureGroup;

 /* =====================
  Create the five category based on the quantile of the number of restaurants
 ===================== */

var createcategory = function(feature){
    if(feature.properties.TOTAL_RESTAURANTS === 0){feature.properties.RESTAURANTS_CATEGORY = 'zero';}
    if(feature.properties.TOTAL_RESTAURANTS>=1 &&  feature.properties.TOTAL_RESTAURANTS<= 2){feature.properties.RESTAURANTS_CATEGORY = 'low1';}
    if(feature.properties.TOTAL_RESTAURANTS>=3 && feature.properties.TOTAL_RESTAURANTS <= 4){feature.properties.RESTAURANTS_CATEGORY = 'middle';}
    if(feature.properties.TOTAL_RESTAURANTS>=5 && feature.properties.TOTAL_RESTAURANTS <= 8){feature.properties.RESTAURANTS_CATEGORY = 'high';}
    if(feature.properties.TOTAL_RESTAURANTS > 8){feature.properties.RESTAURANTS_CATEGORY = 'highest';}
};

/* =====================
 Create myStyle function
===================== */

var myStyle = function(feature) {
   createcategory(feature);
  switch (feature.properties.RESTAURANTS_CATEGORY){
      case 'zero': return {color: "#ffffcc",weight:1.2,fillColor:"#ffffcc",fillOpacity:0.8};
      case 'low1': return {color: "#a1dab4",weight:1.2,fillColor:"#a1dab4",fillOpacity:0.8};
      case 'middle': return {color: "#41b6c4",weight:1.2,fillColor:"#41b6c4",fillOpacity:0.8};
      case 'high': return {color: "#2c7fb8",weight:1.2,fillColor:"#2c7fb8",fillOpacity:0.8};
      case 'highest': return {color: "#253494",weight:1.2,fillColor:"#253494",fillOpacity:0.8};
      default: return {color: '#9fa0a0',weight:1.2,fillColor:"9fa0a0",fillOpacity:0.8};
  }
 };

/* =====================
 Click the polygon and show the pop up.
===================== */
var highlight = {
       'fillColor': '#d7191c',
       'weight': 2,
       'opacity': 1
   };

function forEachFeature(feature, layer) {

   var popupContent = "<p><b>Total number of restaurants: </b>"+ feature.properties.TOTAL_RESTAURANTS +
       "</br><b>Access to high-produce supply stores: </b>"+ feature.properties.HPSS_ACCESS +
       "</br><b>Total number of high-produce supply stores: </b>"+ feature.properties.TOTAL_HPSS +
       "</br><b>None Residential: </b>"+ feature.properties.NON_RESIDENTIAL +
       '</p>';
   layer.bindPopup(popupContent);

   layer.on("click", function (e) {
      layer.setStyle(highlight);  //highlights selected.
   });
}

/* =====================
 The first map
===================== */
 var initial = function(){
   $(document).ready(function() {
   $.ajax(dataset).done(function(data) {
     var parsedData = JSON.parse(data);
     featureGroup = L.geoJson(parsedData, {
       style: myStyle,
       onEachFeature: forEachFeature
     }).addTo(map);
     map.flyTo([40.000, -75.1590],11);
     console.log(parsedData);
   });
 });
 };

 initial();

 /* =====================
  The second map
 ===================== */
var myFilter2 = function(feature) {
  createcategory(feature);
  if(feature.properties.RESTAURANTS_CATEGORY === 'highest'){return true;}
  };

var myStyle2 = function(feature) {
    createcategory(feature);
    switch (feature.properties.RESTAURANTS_CATEGORY){
        case 'highest': return {color: "#253494",weight:1.2,fillColor:"#253494",fillOpacity:0.8};
    }
   };

var secondMap = function(){
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle2,
      filter: myFilter2,
      onEachFeature: forEachFeature
    }).addTo(map);
    map.flyTo([40.000, -75.1590],11);
    console.log(parsedData);
  });
});
};

/* =====================
 The third map
===================== */
var myFilter3 = function(feature) {
    createcategory(feature);
    if(feature.properties.RESTAURANTS_CATEGORY === 'high'){return true;}
    };

var myStyle3 = function(feature) {
       createcategory(feature);
      switch (feature.properties.RESTAURANTS_CATEGORY){
        case 'high': return {color: "#2c7fb8",weight:1.2,fillColor:"#2c7fb8",fillOpacity:0.8};
      }
     };

var thirdMap = function(){
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle3,
      filter: myFilter3,
      onEachFeature: forEachFeature
    }).addTo(map);
    map.flyTo([40.000, -75.1590],11);
    console.log(parsedData);
  });
});
};

/* =====================
 The forth map
===================== */
var myFilter4 = function(feature) {
  createcategory(feature);
  if(feature.properties.RESTAURANTS_CATEGORY === 'middle'){return true;}
  };

var myStyle4 = function(feature) {
     createcategory(feature);
    switch (feature.properties.RESTAURANTS_CATEGORY){
      case 'middle': return {color: "#41b6c4",weight:1.2,fillColor:"#41b6c4",fillOpacity:0.8};
    }
   };

var forthMap = function(){
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle4,
      filter: myFilter4,
      onEachFeature: forEachFeature
    }).addTo(map);
    map.flyTo([40.000, -75.1590],11);
    console.log(parsedData);
  });
});
};

/* =====================
 The fifth map
===================== */
var myFilter5 = function(feature) {
  createcategory(feature);
  if(feature.properties.RESTAURANTS_CATEGORY === 'low1'){return true;}
  };

var myStyle5 = function(feature) {
  createcategory(feature);
  switch (feature.properties.RESTAURANTS_CATEGORY){
    case 'low1': return {color: "#a1dab4",weight:1.2,fillColor:"#a1dab4",fillOpacity:0.8};
}
};

var fifthMap = function(){
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle5,
      filter: myFilter5,
      onEachFeature: forEachFeature
    }).addTo(map);
    map.flyTo([40.000, -75.1590],11);
    //map.flyTo([40.000, -75.1590],15);
    console.log(parsedData);

  });
});
};

/* =====================
 The sixth map
===================== */
var myFilter6 = function(feature) {
  createcategory(feature);
  if(feature.properties.RESTAURANTS_CATEGORY === 'zero'){return true;}
  };

var myStyle6 = function(feature) {
  createcategory(feature);
  switch (feature.properties.RESTAURANTS_CATEGORY){
    case 'zero': return {color: "#ffffcc",weight:1.2,fillColor:"#ffffcc",fillOpacity:0.8};
}
};

var sixthMap = function(){
$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle6,
      filter: myFilter6,
      onEachFeature: forEachFeature
    }).addTo(map);
    map.flyTo([39.950, -75.1600],14);
    console.log(parsedData);
  });
});
};
