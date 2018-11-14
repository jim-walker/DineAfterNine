const address = [];
const apiKey = "AIzaSyBtDXqrmP1A6NzPFxzjveh5ICYCFywHeKU";
const placeIDs = [];
let map;
// let userAddress;
let restuarantIDs = [];
// let queryUrl;

//check to see if check boxes are disabled
let btnDisabled = false;

//term to search for
let toSearchFor = "";

//checks to see if user completed form
let isFormComplete = false;

let placesToDump = [];



$(document).ready(function () {
    $(".form-check-input").on("click", function () {
        $(this).attr("isSelected", "true");
        $('#rest-info').empty();
        toSearchFor = "";
        toSearchFor = $(this).attr("data-text");

        isFormComplete = true;
        restuarantIDs = [];

        if (!btnDisabled) {
            disableBoxes(this);

        } else if (btnDisabled) {
            releaseBoxes(this);

        }


    });
});

// disables other boxes after the user chooses one
const disableBoxes = (caller) => {
    let chosenBox = caller;
    let storedTxt = $(chosenBox).attr("data-text");
    btnDisabled = true;
    switch (storedTxt) {
        case "hamburgers":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled");
            $("#check-chinese").attr("disabled", "disabled");
            $("#check-mexican").attr("disabled", "disabled");
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
        case "breakfast":
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled");
            $("#check-chinese").attr("disabled", "disabled")
            $("#check-mexican").attr("disabled", "disabled");
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
        case "japanese restaurant":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            $("#check-chinese").attr("disabled", "disabled")
            $("#check-mexican").attr("disabled", "disabled");
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
         case "chinese restaurant":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled")
            $("#check-mexican").attr("disabled", "disabled");
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
        case "mexican restaurant":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled")
            $("#check-chinese").attr("disabled", "disabled")
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
        case "pizza":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled")
            $("#check-chinese").attr("disabled", "disabled")
            $("#check-mexican").attr("disabled", "disabled")
            $("#check-desserts").attr("disabled", "disabled")
            break;
        case "desserts":
            $("#check-breakfast").attr("disabled", "disabled");
            $("#check-diner").attr("disabled", "disabled");
            $("#check-japanese").attr("disabled", "disabled")
            $("#check-chinese").attr("disabled", "disabled")
            $("#check-pizza").attr("disabled", "disabled")
            $("#check-mexican").attr("disabled", "disabled")
            break;
        default:
            return;
    }
}

//if the user deselects their box, the other boxes will be clickable
const releaseBoxes = (caller) => {
    let storedTxt = $(caller).attr("data-text");

    switch (storedTxt) {
        case "hamburgers":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-japanese").removeAttr("disabled");
            $("#check-chinese").removeAttr("disabled")
            $("#check-mexican").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;

            break;
        case "breakfast":
            $("#check-diner").removeAttr("disabled");
            $("#check-japanese").removeAttr("disabled");
            $("#check-chinese").removeAttr("disabled")
            $("#check-mexican").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;

            break;
        case "japanese restaurant":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            $("#check-chinese").removeAttr("disabled")
            $("#check-mexican").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;
            break;
        case "chinese restaurant":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            $("#check-mexican").removeAttr("disabled")
            $("#check-japanese").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;
            break;
        case "mexican restaurant":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            $("#check-chinese").removeAttr("disabled")
            $("#check-japanese").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;
            break;
        case "pizza":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            $("#check-mexican").removeAttr("disabled")
            $("#check-japanese").removeAttr("disabled")
            $("#check-chinese").removeAttr("disabled")
            $("#check-desserts").removeAttr("disabled")
            btnDisabled = false;
            break;
        case "desserts":
            $("#check-breakfast").removeAttr("disabled");
            $("#check-diner").removeAttr("disabled");
            $("#check-mexican").removeAttr("disabled")
            $("#check-japanese").removeAttr("disabled")
            $("#check-chinese").removeAttr("disabled")
            $("#check-pizza").removeAttr("disabled")
            btnDisabled = false;
            break;
        default:
            return;
    }

}

//gets the address the user inputs
const getAddress = () => {
    let street = $("#address").val().trim();
    let city = $("#city").val().trim();
    let state = $("#state").val().trim();
    let zipcode = $("#zipcode").val().trim();

    //pushes it to the address array
    address.push(street, city, state, zipcode);
}

$('#submit-geo').on('click', function (event) {
    //if the user has given an address and chosen what they want to search for
    event.preventDefault();

    if (isFormComplete) {
        getAddress();

        //sets the address
        let userAddress = address.join();
        let coords;

        let queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${apiKey}`;
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {


            let source = response.results;
            // console.log(source);
            for (let i = 0; i < source.length; i++) {
                //creates a variable that will hold the users lat and lng coordinates
                coords = { lat: source[i].geometry.location.lat, lng: source[i].geometry.location.lng };

            }
            //initialize map with user's coordinates
            initMap(coords);
        });
    } else {
        return false;
    }
 
});

//creates a map to said id
const initMap = (coords) => {
    map = new google.maps.Map(document.getElementById('geo-map'), {
        center: coords,
        //controls how 'zoomed' the map will start
        zoom: 11
    });
    //recieve locations at a 10 mile radius from the user's coordinates
    getRestPlaces(coords);
}

// returns places around the user at 10-mile radius
const getRestPlaces = (coords) => {

    let coordsArr = [];

    for (num in coords) {
        coordsArr.push(coords[num]);
    }

    let originalUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordsArr[0]},${coordsArr[1]}&radius=10000&keyword=${toSearchFor}&key=${apiKey}`;
    let queryUrl = "https://cors-anywhere.herokuapp.com/" + originalUrl;

    $.ajax({
        url: queryUrl,
        method: 'GET',
        dataType: "json",
        headers: {
            "x-requested-with": "xhr"
        }
    }).then(function (response) {

        let source = response.results;
        for (let i = 0; i < source.length; i++) {
            //create obj that holds an id of the place received by the api
            let place = {
                id: source[i].place_id
            }
            //pushes place id into restuarantIDs
            restuarantIDs.push(place);

        }
        //renders place markers to the map
        renderMarks(map, restuarantIDs);
    });
}

const renderMarks = (map, idArr) => {
    //initialize info window
    let infowindow = new google.maps.InfoWindow();
    // initialize google place details service
    let service = new google.maps.places.PlacesService(map);
    for (let i = 0; i < idArr.length; i++) {

        service.getDetails({
            //passes ids for each of the places in the array
            placeId: idArr[i].id
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                //create for a place
                let marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: place.geometry.location
                });
                marker.addListener('click', toggleBounce);
                //if click on the marker, an info window will render above it showing specific detais about the place
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div id="fade-test"><strong>' + place.name + '</strong><br>' +
                        'Rating: ' + place.rating  + checkPhone() + 
                        getTravelUrl(address, place.formatted_address) + '<br></div>');
                    infowindow.open(map, this);
                });
                function toggleBounce() {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
                //checks to see if the place has a phone
                function checkPhone() {
                    let phone = place.formatted_phone_number;

                    if (typeof phone !== typeof undefined && phone !== false) {
                        //if phone number is present, add phone to the content
                        return `<br> ${phone} <br>`;

                    } else {
                        //else just had a space
                        return `<br>`;
                    }

                }
                //if the place rating is greater than or equal to 4.6, render the following content to the 'restuarant recommendations' div

                if (place.rating >= 4.0) {

                    let text = $('<div id="fade-test"><strong>' + place.name + '</strong><br>' +
                        'Rating: ' + place.rating + checkPhone() +
                        '</div>' + getTravelUrl(address, place.formatted_address));

                    $("#rest-info").append(text);

                    console.log("Code is working");

                }

                if (place.rating >= 4.0) {
                    let gPlace = {
                        name: place.name,
                        rating: place.rating,
                        phone: checkPhone(),
                        address: place.formatted_address

                    }

                    placesToDump.push(gPlace);


                }
            }
        });
    }
    console.log(placesToDump);

}

const getTravelUrl = (origin, destination) => {
    return `<a href="https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving" target="_blank">${destination}</a>`;
}

