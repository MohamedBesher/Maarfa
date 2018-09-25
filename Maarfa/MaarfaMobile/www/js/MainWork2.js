/// <reference path="../js/jquery-2.1.0.js" />
/// <reference path="../js/framework7.min.js" />

//myApp.onPageInit('pagename', function (page) {
//    var s = document.getElementsByTagName('script')[0];
//    var sc = document.createElement('script');
//    sc.type = 'text/javascript'; sc.async = false;
//    sc.src = 'path/to/javascript.js'; s.parentNode.insertBefore(sc, s);
//});



var myApp = new Framework7({
    pushState: true,
    swipeBackPage: true,
    swipePanel: false,
    panelsCloseByOutside: true,
    init: false,
    animateNavBackIcon: true
});

var $$ = Dom7;
var lang = 'En';
var serviceURL = 'http://handbyhandapi.saned-projects.com/';
var hostUrl = 'http://testsaned.webwayeg.com/www/';
var appToken = '';
var userId = 0;
userId = localStorage.getItem("UID");
var markers = [];
var user;
var allCities = [];
var allCategories = [];
var BackIsClicked = false;
var scrollLoadsBefore = false;
var initSplashPage = true;
var initLoginPage = true;
var initForgetPasswordPage = true;
var initSignupPage = true;
var initActivationPage = true;
var initCategoriesPage = true;
var initProductsPage = true;
var initFavouritePage = true;
var initUserPage = true;
var initProfilePage= true;
var initAddProductPage = true;
var initChatPage = true;
var initProductDetailsPage = true;
var initContactPage = true;
var initSearch = true;
var initChangePasswordPage = true;
var initResetPasswordPage = true;
var initSideMenu = true;
var initContactProductOwner = true;
var initLikeProductPopup = true;
var initFavouriteProductPopup = true;
var initShareProductPopup = true;
var initReportProductPopup = true;
var clientId = 'consoleApp';
var clientSecret = '123@abc';
var linkBackSearch = false;
var linkBackAddProduct = false;


var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

$$(document).on('pageInit', function (e) {
    page = e.detail.page;
    if (page.name === 'splash') {
        setTimeout(function () {
            initSplashPage = true;
            if (localStorage.getItem('USName')) {
                if (localStorage.getItem('UserEntersCode') == false) {
                    mainView.router.loadPage({ pageName: 'activation' });
                }
                else {
                    mainView.router.loadPage({ pageName: 'categories' });
                }
            }
            else {
                if (localStorage.getItem('UID')) {
                    mainView.router.loadPage({ pageName: 'signup' });
                }
                else {
                    GoToLoginPage(page);
                    mainView.router.loadPage({ pageName: 'login' });
                }
            }
        }, 3000);
        
    }
    else if (page.name === 'login') {
        if (initLoginPage == true) {
            initLoginPage = true;
        }
    }
    else if (page.name === 'forgetPass') {
        initForgetPassword = true;
    }
    else if (page.name === 'signup') {
        initSignupPage = true;
    }
    else if (page.name === 'activation') {
        initActivationPage = true;
    }
    else if (page.name === 'categories') {
        initCategoriesPage = true;
    }
    else if (page.name === 'products') {
        initProductsPage = true;
    }
    else if (page.name === 'favourite') {
        initFavouritePage = true;
    }
    else if (page.name === 'user') {
        initUserPage = true;
    }
    else if (page.name === 'profile') {
        initProfilePage = true;
    }
    else if (page.name === 'addProduct') {
        initAddProductPage = true;
        linkBackAddProduct = false;
    }
    else if (page.name === 'chat') {
        initChatPage = true;
    }
    else if (page.name === 'productDetails') {
        initProductDetailsPage = true;
    }
    else if (page.name === 'contact') {
        initContactPage = true;
    }
    else if (page.name === 'search') {
        initSearch = true;
        linkBackSearch = false;
    }
    else if (page.name === 'changePassword') {
        initChangePasswordPage = true;
    }
    else if (page.name === 'resetPassword') {
        initResetPasswordPage = true;
    }
});

$$(".map").click(function () {
    $$(".overlay").hide();
});

$$('#tab1').on('show', function () {
    $$(".filter").hide();
});

$$('#tab2').on('show', function () {
    $$(".filter").hide();
});
$$("#facebookLogin").on("click", function () {
    myApp.alert('gggg');
    var fbLoginFailed = function (error) {
        console.log(error);
    }
        var fbLoginSuccess = function (userData) {
            if (userData.authResponse) {
                //facebookConnectPlugin.api(String requestPath, Array permissions, Function success, Function failure
                facebookConnectPlugin.api("me/?fields=id,last_name,email,picture", ["public_profile", "email"], function (userData) {
                    if (userData.error) {
                        console.log(JSON.stringify(userData.error));
                    } else {
                        SetSocialInLocalStorage(userData.id, userData.picture.data.url, userData.email, userData.last_name);
                        mainView.router.loadPage({ pageName: 'signup' });
                    }
                });
            }
        }
    
    facebookConnectPlugin.login(["public_profile", "email"], fbLoginSuccess, fbLoginFailed);

   

    

    

});




window.document.addEventListener('backbutton', function (event) {
    var currentPage = mainView.activePage.name;
    if (device.platform.indexOf('dr') > 0 && (currentPage == 'splash' || currentPage == 'login' || currentPage == 'categories')) {

        navigator.notification.confirm(
            'هل تريد الخروج من التطبيق ؟',
            onConfirmAr,
            'تأكيد الخروج',
            ['نعم', 'إلغاء']);
    }
    else {
        BackIsClicked = true;
        mainView.router.back();
    }
});

function onConfirmAr(buttonIndex) {
    if (buttonIndex == 1) {
        if (device.platform.indexOf('dr') > 0)
            navigator.app.exitApp();
    }
}

window.addEventListener('native.keyboardhide', keyboardHideHandler);
window.addEventListener('native.keyboardshow', keyboardShowHandler);

function ExitApplication() {
    if (navigator.app) {
        navigator.app.exitApp();
    }
    else if (navigator.device) {
        navigator.device.exitApp();
    }
}

function onConfirmExit(buttonIndex) {
    if (buttonIndex == 1) {
        if (device.platform.indexOf('dr') > 0) {
            ExitApplication();
        }
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;
    return networkState;
}

document.addEventListener("offline", onOffline, false);
window.addEventListener('native.keyboardhide', keyboardHideHandler);
window.addEventListener('native.keyboardshow', keyboardShowHandler);

function onOffline() {
    // Handle the offline event
    navigator.notification.alert('انت غير متصل بالانترنت , من فضلك أعد تشغيل البرنامج بعد التأكد من الإنترنت .', function () {
        ExitApplication();
    }, 'خطأ', 'موافق');
}

function arabictonum(arabicnumstr) {
    var num = 0;
    var c;
    for (var i = 0; i < arabicnumstr.length; i++) {
        c = arabicnumstr.charCodeAt(i);
        num += c - 1632;
        num *= 10;
    }
    return num / 10;
}

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

function ClearBodyAfterGoogleMap() {
    console.log('clear');
    $('span').each(function () {
        var span = $(this);
        if ($(this).text() === 'BESbewy') {
            $(this).remove();
        }
    });

    $('div').each(function () {
        var div = $(this);
        if ($(this).hasClass('pac-container pac-logo hdpi') && $(this).children().length == 0) {
            $(this).remove();
        }
    });
}

function keyboardHideHandler(e) {
    //alert('Goodnight, sweet prince');
    if ($('.ui-footer').hasClass('ui-fixed-hidden')) {
        $('.ui-footer').removeClass('ui-fixed-hidden');
    }
}

function keyboardShowHandler(e) {
    //alert('Keyboard height is: ' + e.keyboardHeight);
    $('.ui-footer').addClass('ui-fixed-hidden');
}

function GetCurrentDateTime(date) {
    var currentdate = new Date();
    if (date == '') {
        currentdate = new Date();
    }
    else {
        currentdate = date;
    }

    var month = parseInt((currentdate.getMonth() + 1));
    var day = parseInt(currentdate.getDate());
    var datetime;

    if (month < 10) {
        if (day < 10) {
            datetime = currentdate.getFullYear() + "-0" + (currentdate.getMonth() + 1) + "-0" + currentdate.getDate();
            //+ " T"+ currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        }
        else {
            datetime = currentdate.getFullYear() + "-0" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate();
            //+ " T" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        }
    }
    else {
        if (day < 10) {
            datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-0" + currentdate.getDate();
            //+ " T" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        }
        else {
            datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate();
            //+ " T" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        }
    }

    return datetime;
}

function geocodeLatLng(Lat, Lang, callBack) {
    var latlng = { lat: parseFloat(Lat), lng: parseFloat(Lang) };
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var result = results[0].formatted_address;
                callBack(result);
            } else {
                callBack('');
            }
        } else {
            callBack('');
        }
    });
}

function InitMapSearchBox(map, markers, selectedAddress) {
    if (selectedAddress != '') {
        $('#pac-input').val(selectedAddress);
    }

    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': selectedAddress
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter(results[0].geometry.location);

                    markers = [];

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        title: results[0].formatted_address,
                        position: results[0].geometry.location
                    }));


                    var lat = results[0].geometry.location.lat();
                    var lang = results[0].geometry.location.lng();


                    localStorage.setItem('FacilityAddressLatitude', lat);
                    localStorage.setItem('FacilityAddressLongtitude', lang);
                    localStorage.setItem('FacilityAddress', $('#pac-input').val());

                    var infoWindow = new google.maps.InfoWindow();

                    for (var i = 0; i < markers.length; i++) {
                        var data = markers[i];
                        var myLatlng = new google.maps.LatLng(data.position.lat(), data.position.lng());
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: data.title
                        });

                        (function (marker, data) {
                            google.maps.event.addListener(marker, "click", function (e) {
                                infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.title + "</div>");
                                infoWindow.open(map, marker);
                            });
                        })(marker, data);
                    }

                }
                else {
                    alert("No results found");
                }
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}

function initMap(markers, fromPage, selectedAddress, callback) {
    var mapDiv;
    var flightPlanCoordinates = [];

    if (fromPage == 'addTrip') {
        mapDiv = document.getElementById('mapTrip');
    }
    else {
        mapDiv = document.getElementById('mapTransport');
    }

    

    var map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 10,
        mapTypeId: 'terrain'
    });

    if (markers.length > 0) {
        map = new google.maps.Map(mapDiv, {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 10,
            mapTypeId: 'terrain'
        });

        var infoWindow = new google.maps.InfoWindow();

        for (var i = 0; i < markers.length; i++) {
            var data = markers[i];
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            //flightPlanCoordinates.push(new google.maps.LatLng(data.lat, data.lng));
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });

            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.title + "</div>");
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
    }

    callback(map);

    //var flightPath = new google.maps.Polyline({
    //    path: flightPlanCoordinates,
    //    geodesic: true,
    //    strokeColor: '#FF0000',
    //    strokeOpacity: 1.0,
    //    strokeWeight: 2
    //});

    //flightPath.setMap(map);
}

function SetUserInLocalStorage(usrName, usrPass, usrId) {
    localStorage.setItem('USName', usrName);
    localStorage.setItem('UPass', usrPass);
    localStorage.setItem('UserId', usrId);
}

function ShowLoader(pageName) {
    var divPage = document.getElementById(pageName + 'Page');
    var divLoader = document.createElement('div');
    var divCube = document.createElement('div');
    var divCubeP1 = document.createElement('div');
    var divCubeP2 = document.createElement('div');
    var divCubeP3 = document.createElement('div');
    var divCubeP4 = document.createElement('div');
    var hdrWait = document.createElement('h3');

    divLoader.className += 'loader divLoader';
    divCube.className += 'cssload-thecube';
    divCubeP1.className += 'cssload-cube cssload-c1';
    divCubeP2.className += 'cssload-cube cssload-c2';
    divCubeP3.className += 'cssload-cube cssload-c3';
    divCubeP4.className += 'cssload-cube cssload-c4';
    hdrWait.innerHTML = 'برجاء الإنتظار';

    divCube.appendChild(divCubeP1);
    divCube.appendChild(divCubeP2);
    divCube.appendChild(divCubeP3);
    divCube.appendChild(divCubeP4);
    divLoader.appendChild(divCube);
    divLoader.appendChild(hdrWait);
    divPage.appendChild(divLoader);
    $(".loader").fadeIn("slow");
}

function HideLoader() {
    $(".loader").fadeOut("slow");
    $('div').each(function () {
        var div = $(this);
        if ($(this).hasClass('loader divLoader')) {
            $(this).remove();
        }
    });
}

function RefreshToken(pageName, CallType, MethodName, callback) {
    var token = "'" + localStorage.getItem('refreshToken') + "'";
    $.ajax({
        type: CallType,
        url: serviceURL + MethodName,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "postman-token": "a7924ea4-7d97-e2f6-5b56-33cbffb586a7"
        },
        data: { 'refresh_token': token, 'grant_type': 'refresh_token', 'client_id': clientId, 'client_secret': clientSecret },
        async: true,
        crossDomain: true,
        success: function (result) {
            
        },
        error: function (error) {
           
        }
    }).done(function (result) {
        var res = result;
        HideLoader();
        callback(res);
    })
        .fail(function (error, textStatus) {
            HideLoader();
            console.log("Error in (" + MethodName + ") , Error text is : [" + error.responseText + "] , Error json is : [" + error.responseJSON + "] .");

            var responseText = JSON.parse(error.responseText);

            if (typeof responseText.error_description != 'undefined') {
                var error_description = responseText.error_description;
                myApp.alert(error_description, 'خطأ', function () { });
            }

            if (typeof responseText.message != 'undefined') {
                var message = responseText.message;
                myApp.alert(message, 'خطأ', function () { });
            }

            if (typeof responseText.error != 'undefined') {
                var error = responseText.error;
                myApp.alert(error, 'خطأ', function () { });
            }
            
        });
}

function GetToken(pageName, CallType, MethodName, userName, password, callback) {
    ShowLoader(pageName);
    $.ajax({
        type: CallType,
        url: serviceURL + MethodName,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "postman-token": "a7924ea4-7d97-e2f6-5b56-33cbffb586a7"
        },
        data: { 'userName': userName, 'Password': password, 'grant_type': 'password', 'client_id': clientId, 'client_secret': clientSecret },
        async: true,
        crossDomain: true,
        success: function (result) {

        },
        error: function (error) {

        }
    }).done(function (result) {
        var res = result;
        HideLoader();
        callback(res);
    })
        .fail(function (error, textStatus) {
            HideLoader();
            console.log("Error in (" + MethodName + ") , Error text is : [" + error.responseText + "] , Error json is : [" + error.responseJSON + "] .");
            
            var responseText = JSON.parse(error.responseText);

            if (typeof responseText.error_description != 'undefined') {
                var error_description = responseText.error_description;
                if (error_description === 'The user name or password is incorrect.') {
                    myApp.alert('خطأ في إسم الدخول أو كلمة المرور .', 'خطأ', function () { });
                }
            }
            else if (typeof responseText.message != 'undefined') {
                var message = responseText.message;
                callback(null);
            }
            else if (typeof responseText.error != 'undefined') {
                var error = responseText.error;
                callback(null);
            }
            
        });
}

function CallService(pageName, CallType, MethodName, dataVariables, callback) {
    if (MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api/trip/GetUserTrip' && MethodName != 'api/home' &&
        MethodName != 'api/Luggage/GetUserLuggage' && !(MethodName == 'api/Luggage/GetAllLuggage' && pageName == 'allTripsAndTransports' &&
        MethodName != 'api/Trip/SearchTrip' && MethodName != 'api/Account/ChangeImage') && pageName != 'SideMenu') {
        ShowLoader(pageName);
    }
    var token = localStorage.getItem('appToken');
    $.ajax({
        type: CallType,
        url: serviceURL + MethodName,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "authorization": "bearer " + token
        },
        data: dataVariables,
        async: true,
        crossDomain: true,
        success: function (result) {

        },
        error: function (error) {

        }
    }).done(function (result) {
        var res = result;
        if (MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api/trip/GetUserTrip' && MethodName != 'api/home' &&
            MethodName != 'api/Luggage/GetUserLuggage' && !(MethodName == 'api/Luggage/GetAllLuggage' && pageName == 'allTripsAndTransports' &&
            MethodName != 'api/Trip/SearchTrip' && MethodName != 'api/Account/ChangeImage') && pageName != 'SideMenu') {
            HideLoader();
        }
        callback(res);
    })
        .fail(function (error, textStatus) {
            console.log("Error in (" + MethodName + ") , Error text is : [" + error.responseText + "] , Error json is : [" + error.responseJSON + "] .");
            var responseText = JSON.parse(error.responseText);

            if (error.status === 401) {
                //RefreshToken(pageName, CallType, 'Token', function (tokenAfterRefresh) {
                //    localStorage.setItem('appToken', tokenAfterRefresh);
                //    CallService(pageName, CallType, MethodName, function (rrrrr) { });
                //});
                myApp.alert('مدة صلاحية رمز التحقق الخاص بك قد انتهت من فضلك قم بتسجيل الدخول مرة أخري .', 'خطأ', function () {
                    localStorage.removeItem('appToken');
                    localStorage.removeItem('USName');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userLoggedIn');
                    localStorage.removeItem('Visitor');
                    initLoginPage = true;
                    mainView.router.loadPage({ pageName: 'login' });
                });
            }
            else {

                if (typeof responseText.error_description != 'undefined') {
                    var error_description = responseText.error_description;
                    myApp.alert(error_description, 'خطأ', function () { });
                    callback(null);
                }
                else if (typeof responseText.modelState != 'undefined') {
                    var messages = responseText.modelState[""];
                    var message = "";
                    if (messages.length > 0) {
                        if (messages[0] === 'Incorrect password.') {
                            myApp.alert('كلمة السر القديمة غير صحيحة .', 'خطأ', function () { });
                        }
                        else {
                            for (var m = 0; m < messages.length; m++) {
                                message += "- [" + messages[m] + " ] - ";
                            }

                            myApp.alert(message, 'خطأ', function () { });
                        }
                        callback(null);
                    }
                    else {
                        callback(null);
                    }

                }
                else {
                    callback(null);
                }
            }

            

            if (MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api/trip/GetUserTrip' && MethodName != 'api/home' &&
                MethodName != 'api/Luggage/GetUserLuggage' && !(MethodName == 'api/Luggage/GetAllLuggage' && pageName == 'allTripsAndTransports' &&
                MethodName != 'api/Trip/SearchTrip' && MethodName != 'api/Account/ChangeImage') && pageName != 'SideMenu') {
                HideLoader();
            }
        });
}


function HideAllSignupControls() {
    $('#liName').css('display', 'none');
    $('#liFullName').css('display', 'none');
    $('#liMobile').css('display', 'none');
    $('#liEmail').css('display', 'none');
    $('#liPassword').css('display', 'none');
    $('#liConfirmPassword').css('display', 'none');
    $('.lblError').removeClass('activeError');
    $('.lblError').removeClass('slideInDown');
}

function ClearAllSignupControls() {
    $('#txtFullName').val('');
    $('#txtName').val('');
    $('#txtMobile').val('');
    $('#txtEmail').val('');
    $('#txtPassword').val();
    $('#txtConfirmPassword').val('');

    $('.smart-select .item-after').html('');

    $('.lblError').removeClass('activeError');
    $('.lblError').removeClass('slideInDown');
}

function getImage() {
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
    });
}

function uploadPhoto(imageURI) {
    var imageName=imageURI.substr(imageURI.lastIndexOf('/') + 1).split('?')[0];

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageName;
    options.mimeType = "image/jpeg";
    options.chunkedMode = false;

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();

    var status = document.getElementById('status');
    //var imgUploading = document.getElementById('imgUploading');
    //var linkAddPhoto = document.getElementById('linkAddPhoto');

    //$('#linkAddPhoto').hide();
    //$('#imgUploading').show();

    ft.upload(imageURI, encodeURI(hostUrl + "UploadPhoto.asmx/UploadFile"), function (r) {

        var user = JSON.parse(localStorage.getItem('userLoggedIn'));

        var params = {
            'Picture': imageName
        }

        CallService('home', "POST", "api/Account/ChangeImage", params, function (res) {
            if (res != null) {
                myApp.alert('تم رفع الصورة بنجاح .', 'نجاح', function () {
                    //$('#linkAddPhoto').show();
                    //$('#imgUploading').hide();

                    var totalPhotoUrl = hostUrl + 'Uploads/' + imageName;
                    localStorage.setItem('usrPhoto', imageName);
                    $('#lblProductImage').html(imageName);
                    //var imgUserAccount = document.getElementById('imgUserAccount');
                    //imgUserAccount.src = totalPhotoUrl;
                });
            }
        });
    },
    function (error) {
        console.log("An error has occurred: Code = " + error.code);
    }, options);
}

function UserNameIsEmailOrPhone(email, mobile) {
    if (email != '' && mobile == '') {
        localStorage.setItem('userUses', 'Email');
    }
    else if (email == '' && mobile != '') {
        localStorage.setItem('userUses', 'Mobile');
    }
    else {
        localStorage.setItem('userUses', 'None');
    }
}

function GetAllCities(fromPage, callBack) {
    allCities = [];
    allCities.push({ id: 1, name: 'الرياض', icon: 'ionicons ion-android-checkmark-circle' });
    allCities.push({ id: 2, name: 'جدة', icon: 'ionicons ion-android-checkmark-circle' });
    allCities.push({ id: 3, name: 'مكة المكرمة', icon: 'ionicons ion-android-checkmark-circle' });
    allCities.push({ id: 4, name: 'المدينة المنورة', icon: 'ionicons ion-android-checkmark-circle' });
    //CallService(fromPage, "GET", "api/Municipality", '', function (result) {
    //    if (result != null) {
    //        for (var c = 0; c < result.length; c++) {
    //            allCities.push({ Id: result[c].id, Name: result[c].name });
    //        }
    //        callBack(allCities.length);
    //    }
    //    else {
    //        myApp.alert('خطأ في إسترجاع بيانات المدن.', 'خطأ', function () { });
    //    }
    //});
}

function GetAllCategories(fromPage, callBack) {
    allCategories = [];
    CallService(fromPage, "GET", "api/Categories", '', function (result) {
        if (result != null) {
            for (var c = 0; c < result.length; c++) {
                allCategories.push({ Id: result[c].id, Name: result[c].name });
            }
            callBack(allCategories.length);
        }
        else {
            myApp.alert('خطأ في إسترجاع بيانات الأصناف.', 'خطأ', function () { });
        }
    });
}

function GetCommentDuration(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    var seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    var hours = Math.floor(difference_ms % 24);
    var days = Math.floor(difference_ms / 24);

    return 'Since : ' + days + ' d, ' + hours + ' h, ' + minutes + ' m, and ' + seconds + ' s';
}

function GetMonth(component) {
    switch (parseInt(component)) {
        case 01 || 1:
            return 00;
            break;
        case 02 || 2:
            return 01;
            break;
        case 03 || 3:
            return 02;
            break;
        case 04 || 4:
            return 03;
            break;
        case 05 || 5:
            return 04;
            break;
        case 06 || 6:
            return 05;
            break;
        case 07 || 7:
            return 06;
            break;
        case 08 || 8:
            return 07;
            break;
        case 09 || 9:
            return 08;
            break;
        case 10:
            return 09;
            break;
        case 11:
            return 10;
            break;
        case 12:
            return 11;
            break;
    }
}

function GetDayOfWeek(component) {
    var weekday = new Array(7);
    weekday[0] = "الأحد"; weekday[1] = "الإثنين"; weekday[2] = "الثلاثاء"; weekday[3] = "الأربعاء"; weekday[4] = "الخميس"; weekday[5] = "الجمعة"; weekday[6] = "السبت";

    return weekday[component];
}

function CheckDateOlderThanToday(CurrentDate, dateToCompare) {
    var value = new Date(CurrentDate[0], GetMonth(CurrentDate[1]), CurrentDate[2]);
    var tripDate = new Date(dateToCompare[0], GetMonth(dateToCompare[1]), dateToCompare[2]);

    var difference_ms = tripDate.getTime() - value.getTime();
    difference_ms = difference_ms / 3600000;
    var days = Math.floor(difference_ms / 24);
    if (days >= 0) {
        return false;
    }
    else {
        return true;
    }
}

function DrawUserDetails(reqUser) {
    //var pTripFrom = document.getElementById('pTripFrom');
    //var pTripTo = document.getElementById('pTripTo');
    //var pTripDayName = document.getElementById('pTripDayName');
    //var pTripLeaveDate = document.getElementById('pTripLeaveDate');
    //var pTripDetailsDesc = document.getElementById('pTripDetailsDesc');

    //pTripFrom.innerHTML = reqTrip.departure;
    //pTripTo.innerHTML = reqTrip.destination;

    //var newLeaveDate = reqTrip.departureDate.split('T')[0];
    //var newArriveDate = reqTrip.destinatioDate.split('T')[0];

    //var tripDate = new Date(newLeaveDate.split('-')[0], GetMonth(newLeaveDate.split('-')[1]), newLeaveDate.split('-')[2]);

    //var n = GetDayOfWeek(tripDate.getDay());

    //pTripDayName.innerHTML = n;
    //pTripLeaveDate.innerHTML = newLeaveDate;

    //if (reqTrip.description == null || reqTrip.description == '' || reqTrip.description == ' ') {
    //    $('#pTripDetailsDesc').hide();
    //    $('#divBalanceNotificationTripDetails').show();
    //}
    //else {
    //    $('#pTripDetailsDesc').show();
    //    $('#divBalanceNotificationTripDetails').hide();
    //    pTripDetailsDesc.innerHTML = reqTrip.description;
    //}

    //if (reqTrip.tripStatus == 1 && reqTrip.isBelong == true) {
    //    $('#linkConfirmTrip').show();
    //}
    //else {
    //    $('#linkConfirmTrip').hide();
    //}

    //if (reqTrip.isBelong == false) {
    //    $('#linkOpenChatFromTrip').show();
    //}
    //else {
    //    $('#linkOpenChatFromTrip').hide();
    //}
    

    //var markers = [{ "title": '', "lat": reqTrip.latitude, "lng": reqTrip.longitude, "description": reqTrip.description }];
    //initMap(markers, 'addTrip', '', function (map) {
    //});
}

function DrawAdvertisment() {
    var divCategoriesInHome = document.getElementById('divCategoriesInHome');
    var divColAdv = document.createElement('div');
    var divAdv = document.createElement('div');
    var imgAdv = document.createElement('img');

    divColAdv.className += 'col-100';
    divAdv.className += 'adv1';
    imgAdv.src = 'img/adv_inner.jpg';

    divAdv.appendChild(imgAdv);
    divColAdv.appendChild(divAdv);

    divCategoriesInHome.appendChild(divColAdv);
    
}

function DrawCategoriesInHome() {
    var divCategoriesInHome = document.getElementById('divCategoriesInHome');
    divCategoriesInHome.innerHTML = '';
    var counter = 0;
    var advCounter = 0;
    var catNumBeforeAdv = 4;
    var indexOfFirstAdv = parseInt(catNumBeforeAdv - 1);
    var indexToRepeatEachAdv = parseInt(indexOfFirstAdv * 2);

    for (var c = 0; c < allCategories.length; c++) {
        var divCategory = document.createElement('div');
        var linkCategory = document.createElement('a');
        var divCard = document.createElement('div');
        var divCardContent = document.createElement('div');
        var divCardContentInner = document.createElement('div');
        var imgCategory = document.createElement('img');
        var divCardFooter = document.createElement('div');
        var divContentBlock = document.createElement('div');
        var bContentBlock = document.createElement('b');

        divCategory.className += 'col-50';
        linkCategory.setAttribute('id', 'linkCategoryHome_' + allCategories[c].id);
        divCard.className += 'card';
        divCardContent.className += 'card-content';
        divCardContentInner.className += 'card-content-inner';
        imgCategory.src = allCategories[c].image;

        divCardFooter.className += 'card-footer';
        divContentBlock.className += 'content-block';
        bContentBlock.innerHTML = allCategories[c].name;

        divContentBlock.appendChild(bContentBlock);
        divCardFooter.appendChild(divContentBlock);

        divCardContentInner.appendChild(imgCategory);
        divCardContent.appendChild(divCardContentInner);
        divCard.appendChild(divCardContent);
        divCard.appendChild(divCardFooter);

        linkCategory.appendChild(divCard);
        divCategory.appendChild(linkCategory);

        divCategoriesInHome.appendChild(divCategory);

        $('#linkCategoryHome_' + allCategories[c].id).on('click', function () {
            var elemId = $(this).attr('id');
            var catId = elemId.split('_')[1];
            var reqCategory;
            for (var i = 0; i < allCategories.length; ++i) {
                if (allCategories[i].id == catId) {
                    reqCategory = allCategories[i];
                    break;
                }
            }
            mainView.router.loadPage({ pageName: 'products', query: { category: reqCategory } });
        });

        

        if (allCategories.length < catNumBeforeAdv) {
            if (c == parseInt(allCategories.length - 1)) {
                DrawAdvertisment();
            }
        }
        else {
            if (c == indexOfFirstAdv) {
                counter = 0;
                advCounter = 0;
                DrawAdvertisment();
            }
            else {
                if (counter > 0 && counter % indexToRepeatEachAdv == 0) {
                    DrawAdvertisment();
                }
            }
        }

        counter++;

    }

    //setTimeout(function () {
    //    var admobid = {};
    //    if (/(android)/i.test(navigator.userAgent)) {
    //        admobid = [
    //            { banner: 'ca-app-pub-1649524270183718/3437601589', interstitial: 'ca-app-pub-1649524270183718/3298000783' }];
    //    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    //        admobid = { banner: 'ca-app-pub-xxx/zzz', interstitial: 'ca-app-pub-xxx/kkk' };
    //    } else {
    //        admobid = { banner: 'ca-app-pub-xxx/zzz', interstitial: 'ca-app-pub-xxx/kkk' };
    //    }

    //    if (AdMob) {
    //        AdMob.createBanner({
    //            adId: admobid[0].banner,
    //            adSize: 'SMART_BANNER',
    //            //width: 200,
    //            //height: 200,
    //            overlap: false,
    //            position: AdMob.AD_POSITION.TOP_CENTER,
    //            //x: 0,
    //            //y: 30,
    //            autoShow: true,
    //            isTesting: true
    //        });
    //    }
    //}, 300);
}

function DrawProductsInCategory(allProductsInCategory, startIndex, itemsPerLoad) {
    var divProductsInCategory = document.getElementById('divProductsInCategory');
    //divProductsInCategory.innerHTML = '';

    var maxNumber = parseInt(startIndex + itemsPerLoad);

    if (maxNumber > allProductsInCategory.length) {
        maxNumber = allProductsInCategory.length;
    }

    for (var productIndex = 0; productIndex < allProductsInCategory.length; productIndex++) {
        var divProductInCategory = document.createElement('div');
        var linkCategory = document.createElement('a');
        var divCard = document.createElement('div');
        var divCardContent = document.createElement('div');
        var divCardContentInner = document.createElement('div');
        var imgCategory = document.createElement('img');
        var divCardFooter = document.createElement('div');
        var divContentBlock = document.createElement('div');
        var bContentBlock = document.createElement('b');

        var divCardOption = document.createElement('div');
        var divContentBlockInOption = document.createElement('div');
        var divRowInOption = document.createElement('div');
        var divFirstColInRowInOption = document.createElement('div');
        var divSecondColInRowInOption = document.createElement('div');
        var divThirdColInRowInOption = document.createElement('div');
        var iFirstInRowInOption = document.createElement('i');
        var iSecondInRowInOption = document.createElement('i');
        var iThirdInRowInOption = document.createElement('i');
        var spanFirstColInRowInOption = document.createElement('span');
        var spanSecondColInRowInOption = document.createElement('span');
        var spanThirdColInRowInOption = document.createElement('span');

        divProductInCategory.className += 'divProductInCategory ';
        divProductInCategory.className += 'col-50';
        linkCategory.setAttribute('id', 'linkProductInCategory_' + allProductsInCategory[productIndex].id);
        divCard.className += 'card';
        divCardContent.className += 'card-content';
        divCardContentInner.className += 'card-content-inner';
        imgCategory.src = allProductsInCategory[productIndex].image;

        divCardFooter.className += 'card-footer';
        divContentBlock.className += 'content-block';
        bContentBlock.innerHTML = allProductsInCategory[productIndex].name;

        divContentBlock.appendChild(bContentBlock);
        divCardFooter.appendChild(divContentBlock);

        divCardContentInner.appendChild(imgCategory);
        divCardContent.appendChild(divCardContentInner);

        divCardOption.className += 'card-option';
        divContentBlockInOption.className += 'content-block';
        divCardOption.className += 'row';
        divFirstColInRowInOption.className += 'col-33';
        divSecondColInRowInOption.className += 'col-33';
        divThirdColInRowInOption.className += 'col-33';
        iFirstInRowInOption.className += 'ionicons ion-android-textsms';
        iSecondInRowInOption.className += 'ionicons ion-eye';
        iThirdInRowInOption.className += 'ionicons ion-android-favorite';
        spanFirstColInRowInOption.innerHTML = '99+';
        spanSecondColInRowInOption.innerHTML = '99+';
        spanThirdColInRowInOption.innerHTML = '99+';

        divFirstColInRowInOption.appendChild(iFirstInRowInOption);
        divFirstColInRowInOption.appendChild(spanFirstColInRowInOption);
        divSecondColInRowInOption.appendChild(iSecondInRowInOption);
        divSecondColInRowInOption.appendChild(spanSecondColInRowInOption);
        divThirdColInRowInOption.appendChild(iThirdInRowInOption);
        divThirdColInRowInOption.appendChild(spanThirdColInRowInOption);

        divRowInOption.appendChild(divFirstColInRowInOption);
        divRowInOption.appendChild(divSecondColInRowInOption);
        divRowInOption.appendChild(divThirdColInRowInOption);

        divContentBlockInOption.appendChild(divRowInOption);
        divCardOption.appendChild(divContentBlockInOption);



        divCardContent.appendChild(divCardOption);
        divCard.appendChild(divCardContent);
        divCard.appendChild(divCardFooter);

        linkCategory.appendChild(divCard);
        divProductInCategory.appendChild(linkCategory);

        divProductsInCategory.appendChild(divProductInCategory);

        $('#linkProductInCategory_' + allProductsInCategory[productIndex].id).on('click', function () {
            var elemId = $(this).attr('id');
            var productId = elemId.split('_')[1];
            var reqProduct;
            for (var i = 0; i < allProductsInCategory.length; ++i) {
                if (allProductsInCategory[i].id == productId) {
                    reqProduct = allProductsInCategory[i];
                    break;
                }
            }
            mainView.router.loadPage({ pageName: 'productDetails', query: { product: reqProduct, fromPage: 'products' } });
        });
    }
}

function DrawUserProducts(userProducts) {
    var divUserProducts = document.getElementById('divUserProducts');
    divUserProducts.innerHTML = '';

    for (var productIndex = 0; productIndex < userProducts.length; productIndex++) {
        var divUserProduct = document.createElement('div');
        var linkCategory = document.createElement('a');
        var divCard = document.createElement('div');
        var divCardContent = document.createElement('div');
        var divCardContentInner = document.createElement('div');
        var imgCategory = document.createElement('img');
        var divCardFooter = document.createElement('div');
        var divContentBlock = document.createElement('div');
        var bContentBlock = document.createElement('b');

        var divCardOption = document.createElement('div');
        var divContentBlockInOption = document.createElement('div');
        var divRowInOption = document.createElement('div');
        var divFirstColInRowInOption = document.createElement('div');
        var divSecondColInRowInOption = document.createElement('div');
        var divThirdColInRowInOption = document.createElement('div');
        var iFirstInRowInOption = document.createElement('i');
        var iSecondInRowInOption = document.createElement('i');
        var iThirdInRowInOption = document.createElement('i');
        var spanFirstColInRowInOption = document.createElement('span');
        var spanSecondColInRowInOption = document.createElement('span');
        var spanThirdColInRowInOption = document.createElement('span');

        divUserProduct.className += 'divUserProduct ';
        divUserProduct.className += 'col-50';
        linkCategory.setAttribute('id', 'linkUserProduct_' + userProducts[productIndex].id);
        divCard.className += 'card';
        divCardContent.className += 'card-content';
        divCardContentInner.className += 'card-content-inner';
        imgCategory.src = userProducts[productIndex].image;

        divCardFooter.className += 'card-footer';
        divContentBlock.className += 'content-block';
        bContentBlock.innerHTML = userProducts[productIndex].name;

        divContentBlock.appendChild(bContentBlock);
        divCardFooter.appendChild(divContentBlock);

        divCardContentInner.appendChild(imgCategory);
        divCardContent.appendChild(divCardContentInner);

        divCardOption.className += 'card-option';
        divContentBlockInOption.className += 'content-block';
        divCardOption.className += 'row';
        divFirstColInRowInOption.className += 'col-33';
        divSecondColInRowInOption.className += 'col-33';
        divThirdColInRowInOption.className += 'col-33';
        iFirstInRowInOption.className += 'ionicons ion-android-textsms';
        iSecondInRowInOption.className += 'ionicons ion-eye';
        iThirdInRowInOption.className += 'ionicons ion-android-favorite';
        spanFirstColInRowInOption.innerHTML = '99+';
        spanSecondColInRowInOption.innerHTML = '99+';
        spanThirdColInRowInOption.innerHTML = '99+';

        divFirstColInRowInOption.appendChild(iFirstInRowInOption);
        divFirstColInRowInOption.appendChild(spanFirstColInRowInOption);
        divSecondColInRowInOption.appendChild(iSecondInRowInOption);
        divSecondColInRowInOption.appendChild(spanSecondColInRowInOption);
        divThirdColInRowInOption.appendChild(iThirdInRowInOption);
        divThirdColInRowInOption.appendChild(spanThirdColInRowInOption);

        divRowInOption.appendChild(divFirstColInRowInOption);
        divRowInOption.appendChild(divSecondColInRowInOption);
        divRowInOption.appendChild(divThirdColInRowInOption);

        divContentBlockInOption.appendChild(divRowInOption);
        divCardOption.appendChild(divContentBlockInOption);



        divCardContent.appendChild(divCardOption);
        divCard.appendChild(divCardContent);
        divCard.appendChild(divCardFooter);

        linkCategory.appendChild(divCard);
        divUserProduct.appendChild(linkCategory);

        divUserProducts.appendChild(divUserProduct);

        $('#linkUserProduct_' + userProducts[productIndex].id).on('click', function () {
            var elemId = $(this).attr('id');
            var productId = elemId.split('_')[1];
            var reqProduct;
            for (var i = 0; i < userProducts.length; ++i) {
                if (userProducts[i].id == productId) {
                    reqProduct = userProducts[i];
                    break;
                }
            }
            mainView.router.loadPage({ pageName: 'productDetails', query: { product: reqProduct, fromPage: 'user' } });
        });
    }
}

function DrawProductDetails(reqProduct) {
    //userProducts.push({ id: 1, name: 'اعلان 1', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500',
    //addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });

    var spanProductDetailsComments = document.getElementById('spanProductDetailsComments');
    var spanProductDetailsSeen = document.getElementById('spanProductDetailsSeen');
    var spanProductDetailsLikes = document.getElementById('spanProductDetailsLikes');
    var spanProductDetailsPrice = document.getElementById('spanProductDetailsPrice');
    var spanProductDetailsAddedSince = document.getElementById('spanProductDetailsAddedSince');
    var pProductDetailsOwnerName = document.getElementById('pProductDetailsOwnerName');
    var pProductDetailsOwnerPhoneNumber = document.getElementById('pProductDetailsOwnerPhoneNumber');
    var pProductDetailsDescription = document.getElementById('pProductDetailsDescription');

    spanProductDetailsComments.innerHTML = reqProduct.comments;
    spanProductDetailsSeen.innerHTML = reqProduct.seen;
    spanProductDetailsLikes.innerHTML = reqProduct.likes;
    spanProductDetailsPrice.innerHTML = reqProduct.price;
    spanProductDetailsAddedSince.innerHTML = reqProduct.addDate;
    pProductDetailsOwnerName.innerHTML = 'اسم المعلن';
    pProductDetailsOwnerPhoneNumber.innerHTML = '+00974358358';
    pProductDetailsDescription.innerHTML = reqProduct.desc;

    initContactProductOwner = true;
    initLikeProductPopup = true;
    initFavouriteProductPopup = true;
    initShareProductPopup = true;
    initReportProductPopup = true;
    //----------------------------------------------------------------------------------------------------
    $("#linkContactWithProductOwner").on("click", function () {
        var clickedLink = this;
        myApp.popover('.popover-contactWithOwner', clickedLink);
    });
    $$('.popover-contactWithOwner').on('opened', function () {
        GoToContactProductOwnerOptions(reqProduct);
    });
    //----------------------------------------------------------------------------------------------------
    $("#btnReportProductDetails").on("click", function () {
        var clickedLink = this;
        myApp.popover('.popover-report', clickedLink);
    });
    $$('.popover-report').on('opened', function () {
        GoToReportProduct(reqProduct);
    });
    //----------------------------------------------------------------------------------------------------


    $("#btnLikeProductDetails").on("click", function () {
        myApp.alert('تم عمل إعجاب بنجاح .', 'نجاح', function () {  });
    });

    $("#btnFavouriteProductDetails").on("click", function () {
        myApp.alert('تمت إضافة الإعلان للمفضلة .', 'نجاح', function () {  });
    });
   
    $("#btnShareProductDetails").on("click", function () {
        myApp.alert('تم مشاركة الإعلان بنجاح .', 'نجاح', function () {  });
    });
    
}

function DrawSideMenu() {
    allCategories = [];
    allCategories.push({ id: 1, name: 'فساتين', icon: 'ionicons ion-android-checkmark-circle', image: 'img/1.jpg' });
    allCategories.push({ id: 2, name: 'عود وعطور ', icon: 'ionicons ion-android-checkmark-circle', image: 'img/2.jpg' });
    allCategories.push({ id: 3, name: 'شنط وأبواك', icon: 'ionicons ion-android-checkmark-circle', image: 'img/3.jpg' });
    allCategories.push({ id: 4, name: 'أحذية', icon: 'ionicons ion-android-checkmark-circle', image: 'img/4.jpg' });
    allCategories.push({ id: 5, name: 'ميك اب', icon: 'ionicons ion-android-checkmark-circle', image: 'img/5.jpg' });
    allCategories.push({ id: 6, name: 'عيادات تجميل', icon: 'ionicons ion-android-checkmark-circle', image: 'img/6.jpg' });
    allCategories.push({ id: 7, name: 'فساتين', icon: 'ionicons ion-android-checkmark-circle', image: 'img/1.jpg' });
    allCategories.push({ id: 8, name: 'عود وعطور ', icon: 'ionicons ion-android-checkmark-circle', image: 'img/2.jpg' });
    allCategories.push({ id: 9, name: 'شنط وأبواك', icon: 'ionicons ion-android-checkmark-circle', image: 'img/3.jpg' });
    allCategories.push({ id: 10, name: 'أحذية', icon: 'ionicons ion-android-checkmark-circle', image: 'img/4.jpg' });
    allCategories.push({ id: 11, name: 'ميك اب', icon: 'ionicons ion-android-checkmark-circle', image: 'img/5.jpg' });
    allCategories.push({ id: 12, name: 'عيادات تجميل', icon: 'ionicons ion-android-checkmark-circle', image: 'img/6.jpg' });
    allCategories.push({ id: 13, name: 'فساتين', icon: 'ionicons ion-android-checkmark-circle', image: 'img/1.jpg' });
    allCategories.push({ id: 14, name: 'عود وعطور ', icon: 'ionicons ion-android-checkmark-circle', image: 'img/2.jpg' });
    allCategories.push({ id: 15, name: 'شنط وأبواك', icon: 'ionicons ion-android-checkmark-circle', image: 'img/3.jpg' });
    allCategories.push({ id: 16, name: 'أحذية', icon: 'ionicons ion-android-checkmark-circle', image: 'img/4.jpg' });
    allCategories.push({ id: 17, name: 'ميك اب', icon: 'ionicons ion-android-checkmark-circle', image: 'img/5.jpg' });
    allCategories.push({ id: 18, name: 'عيادات تجميل', icon: 'ionicons ion-android-checkmark-circle', image: 'img/6.jpg' });
    allCategories.push({ id: 19, name: 'فساتين', icon: 'ionicons ion-android-checkmark-circle', image: 'img/1.jpg' });
    allCategories.push({ id: 20, name: 'عود وعطور ', icon: 'ionicons ion-android-checkmark-circle', image: 'img/2.jpg' });
    allCategories.push({ id: 21, name: 'شنط وأبواك', icon: 'ionicons ion-android-checkmark-circle', image: 'img/3.jpg' });

    var divSideMenu = document.getElementById('divSideMenu');
    divSideMenu.innerHTML = '';

    var divLogoContainer = document.createElement('div');
    var imgLogo = document.createElement('img');
    divLogoContainer.className += 'logo-container';
    imgLogo.src = 'img/logo.png';
    divLogoContainer.appendChild(imgLogo);
    divSideMenu.appendChild(divLogoContainer);

    var linkMenuToCategories = document.createElement('a');
    var linkMenuToProfile = document.createElement('a');
    var linkMenuToFavourite = document.createElement('a');
    var linkMenuToContact = document.createElement('a');
    var linkMenuToChangePassword = document.createElement('a');
    var linkMenuToLogOut = document.createElement('a');
    var hrLineInMenu = document.createElement('hr');

    var iCategory = document.createElement('i');
    var iProfile = document.createElement('i');
    var iFavourite = document.createElement('i');
    var iContact = document.createElement('i');
    var iChangePassword = document.createElement('i');
    var iLogOut = document.createElement('i');
    iCategory.className += 'ionicons ion-android-laptop';
    iProfile.className += 'ionicons ion-ios-person-outline';
    iFavourite.className += 'ionicons ion-android-star';
    iContact.className += 'ionicons ion-android-phone-portrait';
    iChangePassword.className += 'icon ion-ios-locked';
    iLogOut.className += 'icon ion-log-out';

    linkMenuToCategories.setAttribute('id', 'linkMenuToCategories');
    linkMenuToCategories.className += 'close-panel';
    linkMenuToCategories.appendChild(iCategory);
    linkMenuToCategories.innerHTML += 'الرئيسيه';

    linkMenuToProfile.setAttribute('id', 'linkMenuToProfile');
    linkMenuToProfile.className += 'close-panel';
    linkMenuToProfile.appendChild(iProfile);
    linkMenuToProfile.innerHTML += 'الصفحة الشخصية';

    linkMenuToFavourite.setAttribute('id', 'linkMenuToFavourite');
    linkMenuToFavourite.className += 'close-panel';
    linkMenuToFavourite.appendChild(iFavourite);
    linkMenuToFavourite.innerHTML += 'المفضلات';

    linkMenuToContact.setAttribute('id', 'linkMenuToContact');
    linkMenuToContact.className += 'close-panel';
    linkMenuToContact.appendChild(iContact);
    linkMenuToContact.innerHTML += 'إتصل بنا';

    linkMenuToChangePassword.setAttribute('id', 'linkMenuToChangePassword');
    linkMenuToChangePassword.className += 'close-panel';
    linkMenuToChangePassword.appendChild(iChangePassword);
    linkMenuToChangePassword.innerHTML += 'تغيير كلمة السر';

    linkMenuToLogOut.setAttribute('id', 'linkMenuToLogOut');
    linkMenuToLogOut.className += 'close-panel';
    linkMenuToLogOut.appendChild(iLogOut);
    linkMenuToLogOut.innerHTML += 'خروج';

    divSideMenu.appendChild(linkMenuToCategories);
    divSideMenu.appendChild(linkMenuToProfile);
    divSideMenu.appendChild(linkMenuToFavourite);
    divSideMenu.appendChild(linkMenuToContact);
    divSideMenu.appendChild(linkMenuToChangePassword);
    divSideMenu.appendChild(linkMenuToLogOut);
    divSideMenu.appendChild(hrLineInMenu);

    $('#linkMenuToCategories').on('click', function () {
        mainView.router.loadPage({ pageName: 'categories' });
    });

    $('#linkMenuToProfile').on('click', function () {
        var user = { id: 1, username: 'Ahmed', name: 'Ahmed Mohamed', mobile: '0108888888', email: 'ahmed@email.com' };
        localStorage.setItem('userLoggedIn', JSON.stringify(user));
        mainView.router.loadPage({ pageName: 'profile' });
    });

    $('#linkMenuToFavourite').on('click', function () {
        mainView.router.loadPage({ pageName: 'favourite' });
    });

    $('#linkMenuToContact').on('click', function () {
        mainView.router.loadPage({ pageName: 'contact' });
    });

    $('#linkMenuToChangePassword').on('click', function () {
        mainView.router.loadPage({ pageName: 'changePassword' });
    });

    $('#linkMenuToLogOut').on('click', function () {
        localStorage.removeItem('appToken');
        localStorage.removeItem('USName');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('Visitor');
        initSplashPage = true;
        initLoginPage = true;
        initForgetPasswordPage = true;
        initSignupPage = true;
        initCategoriesPage = true;
        initProductsPage = true;
        initFavouritePage = true;
        initUserPage = true;
        initProfilePage = true;
        initAddProductPage = true;
        initChatPage = true;
        initProductDetailsPage = true;
        initContactPage = true;
        initSearch = true;
        initChangePasswordPage = true;
        initResetPasswordPage = true;
        initSideMenu = true;
        mainView.router.loadPage({ pageName: 'login' });
    });

    for (var c = 0; c < allCategories.length; c++) {
        var linkCategory = document.createElement('a');
        var iCategory = document.createElement('i');

        iCategory.className += allCategories[c].icon;

        linkCategory.setAttribute('id', 'linkCategoryInMenu_' + allCategories[c].id);
        linkCategory.className += 'close-panel';

        linkCategory.appendChild(iCategory);
        linkCategory.innerHTML += allCategories[c].name;

        divSideMenu.appendChild(linkCategory);

        $('#linkCategoryInMenu_' + allCategories[c].id).on('click', function () {
            var elemId = $(this).attr('id');
            var catId = elemId.split('_')[1];
            var reqCategory;
            for (var i = 0; i < allCategories.length; ++i) {
                if (allCategories[i].id == catId) {
                    reqCategory = allCategories[i];
                    break;
                }
            }
            mainView.router.loadPage({ pageName: 'products', query: { category: reqCategory } });
        });
    }


    $('#linkMenuToChangePassword').hide();
    $('#linkMenuToLogOut').hide();
    $('#linkMenuToProfile').hide();
    $('#linkMenuToFavourite').hide();


    if (localStorage.getItem('USName')) {
        $('#linkMenuToChangePassword').show();
        $('#linkMenuToLogOut').show();
        $('#linkMenuToProfile').show();
        $('#linkMenuToFavourite').show();
    }
}

function loadSideMenuLinks() {
    //GetAllCategories('SideMenu', function (res) {
    //    if (res.length > 0) {
    //        DrawSideMenu();
    //    }
    //});

    DrawSideMenu();
}

function GoToContactProductOwnerOptions(reqProduct) {
    if (initContactProductOwner == true) {
        initContactProductOwner = false;

        $('#linkCallOwner').on('click', function () {
            myApp.closeModal('.popover-contactWithOwner');
            //if (localStorage.getItem('Visitor') == "false") {
            //    var number = reqProduct.owner.mobile;
            //    window.plugins.CallNumber.callNumber(function () {
            //        myApp.closeModal('.popover-contactWithOwner');
            //    }, function () {
            //        myApp.alert('غير قادر علي الإتصال بهذا الهاتف .');
            //    }, number, true);
            //}
            //else {
            //    myApp.alert('لا يمكنك الإتصال بمالك الإعلان ...من فضلك سجل حسابك أولا', 'خطأ');
            //}
        });

        $('#linkChatWithOwner').on('click', function () {
            myApp.closeModal('.popover-contactWithOwner');
            mainView.router.loadPage({ pageName: 'chat', query: { owner: reqProduct.owner } });
        });

    }
}

function GoToReportProduct(reqProduct) {
    if (initReportProductPopup == true) {
        initReportProductPopup = false;
        
        $('#linkReportProduct').on('click', function () {
            myApp.closeModal('.popover-report');
        });

    }
}

function GoToLoginPage(page) {
    if (typeof page != 'undefined') {

        $("#buttonLogin").on("click", function () {
            var loginEmail = $("#LoginEmail").val(), loginPass = $("#LoginPassword").val();

            loginEmail = loginEmail.trim();

            localStorage.setItem('USName', 'AhmedMohamed');
            mainView.router.loadPage({ pageName: 'categories' });
            localStorage.setItem('Visitor', false);

            //if ((loginEmail != '' && loginEmail != ' ' && loginEmail != null) && loginPass != null) {

            //    GetToken('login', "POST", "token", loginEmail, loginPass, function (res) {
            //        if (res != null) {
            //            localStorage.setItem('appToken', res.access_token);
            //            localStorage.setItem('USName', res.userName);
            //            localStorage.setItem('refreshToken', res.refresh_token);
            //localStorage.setItem('Visitor', false);
            //            mainView.router.loadPage({ pageName: 'categories' });
            //        }
            //        else {
            //            myApp.alert('لا يمكن التحقق من البيانات .', 'خطأ', function () { });
            //        }
            //    });

            //}
            //else {
            //    myApp.alert('من فضلك أدخل إسم الدخول وكلمة المرور', 'تنبيه', function () { });
            //}
        });

        $('#btnSignUp').on("click", function () {
            mainView.router.loadPage({ pageName: 'signup' });
        });

        $('#btnNotSignedUp').on("click", function () {
            mainView.router.loadPage({ pageName: 'signup' });
        });

        $('#btnForgetPassword').on("click", function () {
            mainView.router.loadPage({ pageName: 'forgetPass' });
        });

        $('#btnGoToHomeDirectly').on("click", function () {
            localStorage.setItem('Visitor', true);
            mainView.router.loadPage({ pageName: 'categories' });
        });

        // login with FB
        
        // login with G+    
        $("#buttonGoogle").on("click", function () {
            callGoogle();
        });

        $("#buttonTwitter").on("click", function () {
            TwitterConnect.login(function (data) {
                TwitterConnect.showUser(function (result) {
                    SetSocialInLocalStorage(result.id, result.profile_image_url, '', result.name);
                    mainView.router.loadPage({ pageName: 'signup' });
                }, function (error) {
                    console.log('Error retrieving user profile');
                });
            }, function (error) {
                console.log('Error in Login');
            });
        });

    }
}

function GoToSplashPage(page) {
    if (typeof page != 'undefined') {
        if (initSplashPage == true) {
            initSplashPage = false;
            //$("#linkGoLogin").on("click", function () {
            //    mainView.router.loadPage({ pageName: 'login' });
            //});
        }
    }
}

function GoToForgetPasswordPage(page) {
    if (typeof page != 'undefined') {
        $('#txtForgetPasswordEmail').val('');

        if (initForgetPassword == true) {
            initForgetPassword = false;

            $('#btnBackFromForgetPassword').on("click", function () {
                mainView.router.loadPage({ pageName: 'login' });
            });

            $('#btnSendEmail').on("click", function () {
                FValidation.ValidateAll('forgetPassword', function (valid) {
                    if (valid == true) {
                        var params = {
                            'email': $('#txtForgetPasswordEmail').val()
                        }

                        CallService('forgetPassword', "POST", "api/Account/ForgetPassword", params, function (res) {
                            if (res != null) {
                                localStorage.setItem('confirmationMail', $('#txtForgetPasswordEmail').val());
                                myApp.alert('تم إرسال الكود لبريدك الإليكتروني بنجاح .', 'نجاح', function () { mainView.router.loadPage({ pageName: 'resetPassword' }); });
                            }
                            else {
                                myApp.alert('خطأ في إرسال الكود لبريدك الإليكتروني .', 'خطأ', function () { });
                            }
                        });
                    }
                });
            });
        }
    }
}

function GoToResetPasswordPage(page) {
    if (typeof page != 'undefined') {
        $('#txtResetCode').val('');
        $('#txtResetPassword').val('');
        $('#txtResetConfirmPassword').val('');

        if (initResetPasswordPage == true) {
            initResetPasswordPage = false;

            $('#btnResetPasswordBackToHome').on("click", function () {
                mainView.router.loadPage({ pageName: 'login' });
            });

            $('#btnResetPassword').on("click", function () {
                FValidation.ValidateAll('resetPassword', function (valid) {
                    if (valid == true) {
                        var params = {
                            'code': $('#txtResetCode').val(),
                            'email': localStorage.getItem('confirmationMail'),
                            'password': $('#txtResetPassword').val(),
                            'confirmPassword': $('#txtResetConfirmPassword').val()
                        }

                        CallService('resetPassword', "POST", "api/Account/ResetPassword", params, function (res) {
                            if (res != null) {
                                localStorage.removeItem('confirmationMail');
                                myApp.alert('تم تغيير كلمة المرور القديمة بنجاح .', 'نجاح', function () { mainView.router.loadPage({ pageName: 'login' }); });
                            }
                            else {
                                myApp.alert('خطأ في تغيير كلمة المرور القديمة.', 'خطأ', function () { });
                            }
                        });
                    }
                });
            });
        }
    }
}

function GoToChangePasswordPage(page) {
    if (typeof page != 'undefined') {

        if (initChangePasswordPage == true) {
            initChangePasswordPage = false;

            $('#btnPasswordBackToHome').on("click", function () {
                mainView.router.loadPage({ pageName: 'categories' });
            });

            $('#btnChangePassword').on("click", function () {
                FValidation.ValidateAll('changePassword', function (res) {
                    if (res == true) {
                        var params = {
                            'oldPassword': $('#txtChangeOldPassword').val(),
                            'newPassword': $('#txtChangeNewPassword').val(),
                            'ConfirmPassword': $('#txtChangeConfirmNewPassword').val()
                        }

                        //CallService('changePassword', "POST", "Api/Account/ChangePassword", params, function (res) {
                        //    if (res != null) {
                        //        myApp.alert('تم تعديل كلمة السر بنجاح .', 'نجاح', function () { mainView.router.loadPage({ pageName: 'categories' }); });
                        //    }
                        //    else {
                        //        myApp.alert('خطأ في تعديل كلمة السر.', 'خطأ', function () { });
                        //    }
                        //});


                    }
                });
            });
        }
    }
}

function GoToSignUpPage(page) {
    loadSideMenuLinks();
    HideAllSignupControls();
    var signUpType = 'signup';

    if (typeof page != 'undefined') {
        var UID = localStorage.getItem('UID');
        var UPhoto = localStorage.getItem('usrPhoto');
        var UName = localStorage.getItem('UName');
        var UEmail = localStorage.getItem('UEmail');

        if (!localStorage.getItem('userLoggedIn') && UID != null && UID != '') {
            $('#txtFullName').val(UName);
            $('#txtEmail').val(UEmail);
        }

        $('#liName').css('display', '');
        $('#liMobile').css('display', '');
        $('#liFullName').css('display', '');
        $('#liEmail').css('display', '');
        $('#liPassword').css('display', '');
        $('#liConfirmPassword').css('display', '');

        if (localStorage.getItem('userLoggedIn')) {
            var user = JSON.parse(localStorage.getItem('userLoggedIn'));
            //$('#txtName').val(user.userName);
            $('#txtFullName').val(user.name);
            //$('#txtMobile').val(user.phoneNumber);
            //$('#txtEmail').val(user.email);

            signUpType = 'editProfile';

            $('#btnGoToCode').html('تعديل');

            $('#liName').css('display', 'none');
            $('#liEmail').css('display', 'none');
            $('#liMobile').css('display', 'none');
            $('#liPassword').css('display', 'none');
            $('#liConfirmPassword').css('display', 'none');
        }
        else {
            $('#btnGoToCode').html('تسجيل حساب جديد');
        }

        
        var mobile = $('#txtMobile').val();
        var email = $('#txtEmail').val();

        UserNameIsEmailOrPhone(email, mobile);

        if (initSignupPage == true) {
            initSignupPage = false;

            $("#btnBackToHome").on("click", function () {
                if (localStorage.getItem('userLoggedIn')) {
                    mainView.router.loadPage({ pageName: 'profile' });
                }
                else {
                    mainView.router.loadPage({ pageName: 'login' });
                }
            });


            $("#btnGoToCode").on("click", function () {
                FValidation.ValidateAll(signUpType, function (res) {
                    if (res == true) {
                        mainView.router.loadPage({ pageName: 'activation' });
                        //if (localStorage.getItem('userLoggedIn')) {
                        //    var params = {
                        //        'municipalityId': $('#selectCity option:selected').val(),
                        //        'name': $('#txtFullName').val()
                        //    }
                        //    CallService('signup', "POST", "api/Account/ChangeInfo", params, function (res1) {
                        //        if (res1 != null) {

                        //            var userloggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
                        //            userloggedIn.name = params.name;
                        //            userloggedIn.municipalityId = params.municipalityId;
                        //            userloggedIn.municipality = $('#linkCity .item-after').html();

                        //            localStorage.setItem('userLoggedIn', JSON.stringify(userloggedIn));
                        //            mainView.router.loadPage({ pageName: 'categories' });
                        //        }
                        //        else {
                        //            myApp.alert('خطأ في تعديل بيانات المستخدم.', 'خطأ', function () { });
                        //        }
                        //    });
                        //}
                        //else {
                        //    var user = {
                        //        'userName': $('#txtName').val(),
                        //        'Name': $('#txtFullName').val(),
                        //        'Email': $('#txtEmail').val(),
                        //        'PhoneNumber': $('#txtMobile').val(),
                        //        'Password': $('#txtPassword').val(),
                        //        'Role': "user",
                        //        'ConfirmPassword': $('#txtConfirmPassword').val()
                        //    }

                        //    CallService('signup', "POST", "api/Account/Register", user, function (res2) {
                        //        if (res2 != null) {
                        //            localStorage.setItem('USName', 'مستخدم');
                        //            localStorage.setItem('UserID', res2);
                        //            localStorage.setItem('UserEntersCode', false);
                        //            myApp.alert('تم تسجيل المستخدم بنجاح .', 'نجاح', function () { mainView.router.loadPage({ pageName: 'activation' }); });
                        //        }
                        //        else {
                        //            myApp.alert('خطأ في تسجيل مستخدم جديد.', 'خطأ', function () { });
                        //        }
                        //    });
                        //}

                    }
                });

            });
        }
    }

}

function GoToActivationPage(page) {
    if (typeof page != 'undefined') {
        $('#btnSendCode').on('click', function () {
            var txtCode = $('#txtCode').val();
            var userId = localStorage.getItem('UserID');

            mainView.router.loadPage({ pageName: 'categories' });

            //CallService('activation', "POST", "api/Account/ConfirmEmail", { "userId": userId, "code": txtCode }, function (res) {
            //    if (res != null) {
            //        localStorage.setItem('Visitor', false);
            //        localStorage.setItem('UserEntersCode', true);
            //        mainView.router.loadPage({ pageName: 'login' });
            //    }
            //});
        });
    }
}

function GoToCategoriesPage(page) {
    //ShowLoader('home');
    loadSideMenuLinks();

    $('#linkAddProductInCategories').hide();
    $('#lblCategories').show();




    if (localStorage.getItem('USName')) {
        $('#linkAddProductInCategories').show();
        $('#lblCategories').hide();
    }

    DrawCategoriesInHome();

    if (typeof page != 'undefined') {
        if (initCategoriesPage == true) {
            initCategoriesPage = false;

            $("#linkAddProductInCategories").on("click", function () {
                mainView.router.loadPage({ pageName: 'addProduct' });
            });

            $("#linkCategoriesSearch").on("click", function () {
                mainView.router.loadPage({ pageName: 'search' });
            });
        }
    }
}

function GoToSearchPage(page) {
    if (typeof page != 'undefined') {
        //var selectSearchLeavePlace = document.getElementById('selectSearchLeavePlace');
        //var selectSearchArrivePlace = document.getElementById('selectSearchArrivePlace');
        //var selectSearchType = document.getElementById('selectSearchType');
        //selectSearchLeavePlace.innerHTML = '';
        //selectSearchArrivePlace.innerHTML = '';
        //selectSearchType.innerHTML = '';

        //myApp.smartSelectAddOption('#linkSearchLeavePlace select', '<option value="" selected disabled></option>');
        //myApp.smartSelectAddOption('#linkSearchArrivePlace select', '<option value="" selected disabled></option>');
        //myApp.smartSelectAddOption('#linkSearchType select', '<option value="" disabled></option>');

        //myApp.smartSelectAddOption('#linkSearchType select', '<option value="0" selected>رحلة</option>', 0);
        //myApp.smartSelectAddOption('#linkSearchType select', '<option value="1">نقلة</option>');


        //$('#linkSearchLeavePlace .item-after').html('');
        //$('#linkSearchArrivePlace .item-after').html('');
        //$('#searchLeaveDate').val('');
        //$('#searchArriveDate').val('');

        //GetAllCities('search', function (res1) {
        //    for (var c = 0; c < allCities.length; c++) {
        //        myApp.smartSelectAddOption('#linkSearchLeavePlace select', '<option value="' + allCities[c].Id + '">' + allCities[c].Name + '</option>');
        //        myApp.smartSelectAddOption('#linkSearchArrivePlace select', '<option value="' + allCities[c].Id + '">' + allCities[c].Name + '</option>');
        //    }

        //    $('#linkSearchLeavePlace').on('click', function () {
        //        myApp.smartSelectOpen('#linkSearchLeavePlace');
        //    });
        //    $('#linkSearchArrivePlace').on('click', function () {
        //        myApp.smartSelectOpen('#linkSearchArrivePlace');
        //    });
        //});

        if (initSearch == true) {
            initSearch = false;
            $("#linkGoSearch").on("click", function () {
                mainView.router.loadPage({ pageName: 'products' });
            });

            $("#linkBackSearch").on("click", function () {
                mainView.router.loadPage({ pageName: 'categories' });
            });
        }

        //if (initSearch == true) {
        //    initSearch = false;


        //    $("#linkSearch").on("click", function () {
        //        var selectedLeavePlace = $('#selectSearchLeavePlace option:selected').val();
        //        var selectedArrivePlace = $('#selectSearchArrivePlace option:selected').val();

        //        var searchArray = [];
        //        var selectedLeaveDate = null;
        //        var selectedArriveDate = null;

        //        if (typeof calendarSearchLeaveDate.value != 'undefined' && calendarSearchLeaveDate.value.length > 0) {
        //            selectedLeaveDate = $('#searchLeaveDate').val();
        //        }
        //        if (typeof calendarSearchArriveDate.value != 'undefined' && calendarSearchArriveDate.value.length > 0) {
        //            selectedArriveDate = $('#searchArriveDate').val();
        //        }

        //        if (selectedLeavePlace != '' || selectedArrivePlace != '' || selectedLeaveDate != null || selectedArriveDate != null) {
        //            searchArray = [{
        //                leavePlace: selectedLeavePlace,
        //                arrivePlace: selectedArrivePlace,
        //                leaveDate: selectedLeaveDate,
        //                arriveDate: selectedArriveDate,
        //            }];
        //        }

        //        $('#searchLeaveDate').val('');
        //        $('#searchArriveDate').val('');
        //        linkBackSearch = true;
        //        calendarSearchLeaveDate.close();
        //        calendarSearchArriveDate.close();
        //        calendarSearchLeaveDate.setValue([]);
        //        calendarSearchArriveDate.setValue([]);

        //        if ($('#selectSearchType option:selected').val() == 0) {
        //            mainView.router.loadPage({ pageName: 'allTrips', query: { forToday: false, searchParams: searchArray } });
        //        }
        //        else {
        //            mainView.router.loadPage({ pageName: 'allTransports', query: { forToday: false, searchParams: searchArray } });
        //        }
        //    });

        //    $('#linkBackSearch').on('click', function () {
        //        $('#searchLeaveDate').val('');
        //        $('#searchArriveDate').val('');
        //        linkBackSearch = true;
        //        calendarSearchLeaveDate.close();
        //        calendarSearchArriveDate.close();
        //        calendarSearchLeaveDate.setValue([]);
        //        calendarSearchArriveDate.setValue([]);
        //    });
        //}
    }

}

function GoToProductsPage(page) {
    if (typeof page != 'undefined') {
        var reqCategory = page.query.category;

        var divProductsInCategory = document.getElementById('divProductsInCategory');
        divProductsInCategory.innerHTML = '';

        var validProducts = [];
        var loading = false;
        var lastIndex = 6;
        var maxItems = validProducts.length;
        var itemsPerLoad = 6;
        scrollLoadsBefore = false;

        var allProductsInCategory = [];
        allProductsInCategory.push({ id: 1, name: 'اعلان 1', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 2, name: 'اعلان 2', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 3, name: 'اعلان 3', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 4, name: 'اعلان 4', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 5, name: 'اعلان 5', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 6, name: 'اعلان 6', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 7, name: 'اعلان 7', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 8, name: 'اعلان 8', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 9, name: 'اعلان 9', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 10, name: 'اعلان 10', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 11, name: 'اعلان 11', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 12, name: 'اعلان 12', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 13, name: 'اعلان 13', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 14, name: 'اعلان 14', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        allProductsInCategory.push({ id: 15, name: 'اعلان 15', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });

        var params = {
            'PageNumber': 1,
            'PageSize': 6
        }

        var firstProductsOnly = allProductsInCategory.filter(function (el) {
            return el.id >= 1 && el.id < 7;
        });

        //CallService('allTrips', "POST", "api/Trip/GetAllTrip", params, function (res) {
        //if (res != null && res.length > 0) {
        if (firstProductsOnly.length > 0) {
                $('#divProductsInCategory').show();
                $('#divNotificationProductsInCategory').hide();
                $('.loading img').css('display', '');
                //var validProducts = res;
                var validProducts = firstProductsOnly;

                loading = false;
                lastIndex = 6;
                maxItems = validProducts[0].overallCount;
                itemsPerLoad = 6;

                DrawProductsInCategory(validProducts, 0, itemsPerLoad);

                if (validProducts.length <= itemsPerLoad) {
                    $('.loading img').css('display', 'none');
                }
            }
            else {
                $('#divProductsInCategory').hide();
                $('#divNotificationProductsInCategory').show();
                $('.loading img').css('display', 'none');
            }
        //});

        myApp.attachInfiniteScroll($$('.infinite-scroll'));

        $$('.infinite-scroll').on('infinite', function () {
            if (loading) return;
            loading = true;

            setTimeout(function () {
                loading = false;

                if (lastIndex >= maxItems || scrollLoadsBefore == true) {
                    myApp.detachInfiniteScroll($$('.infinite-scroll'));
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }

                $('.loading img').css('display', '');

                var params = {
                    'PageNumber': parseInt(parseInt(lastIndex / 6) + 1),
                    'PageSize': 6
                }

                var requiredProductsOnly = allProductsInCategory.filter(function (el) {
                    return el.id >= parseInt(lastIndex + 1) && el.id < parseInt(parseInt(lastIndex + 1) + 6);
                });

                //CallService('allTrips', "POST", "api/Trip/GetAllTrip", params, function (res1) {
                //if (res1 != null) {
                if (requiredProductsOnly.length > 0) {
                    DrawProductsInCategory(requiredProductsOnly, lastIndex, itemsPerLoad);
                    lastIndex = $$('#divProductsInCategory div.divProductInCategory').length;
                }
                //});
            }, 1000);
        });

    }
}

function GoToProductDetails(page) {
    if (typeof page != 'undefined') {
        var reqProduct = page.query.product;
        var fromPage = page.query.fromPage;

        $('#linkBackProductDetails').on("click", function () {
            mainView.router.loadPage({ pageName: fromPage });
        });

        DrawProductDetails(reqProduct);

        if (initProductDetailsPage == true) {
            initProductDetailsPage = false;
            $("#linkProductDetailsSearch").on("click", function () {
                mainView.router.loadPage({ pageName: 'search' });
            });
        }

    }
}

function GoToFavouritePage(page) {
    if (typeof page != 'undefined') {

    }
}

function GoToUserPage(page) {
    if (typeof page != 'undefined') {

        if (initUserPage == true) {
            initUserPage = false;

            
        }
    }
}

function GoToProfilePage(page) {
    if (typeof page != 'undefined') {
        //CallService('user', "POST", "api/Account/GetUserInfo", '', function (res) {
        //    if (res != null) {
        //        localStorage.setItem('userLoggedIn', JSON.stringify(res));
        //        localStorage.setItem('USName', res.UserName);
        //        if (typeof res.photoUrl != 'undefined' && res.photoUrl != null && res.photoUrl != '' && res.photoUrl != ' ') {
        //            localStorage.setItem('usrPhoto', res.photoUrl);
        //        }
        //    }
        //});

        var userProducts = [];
        userProducts.push({ id: 1, name: 'اعلان 1', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        userProducts.push({ id: 2, name: 'اعلان 2', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        userProducts.push({ id: 3, name: 'اعلان 3', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });
        userProducts.push({ id: 4, name: 'اعلان 4', image: 'img/06.jpg', CatId: '1', overallCount: 15, price: '500', addDate: '12/5/2016', seen: '50', likes: '100', comments: '5', desc: 'description on this product' });

        if (localStorage.getItem('userLoggedIn')) {
            var user = JSON.parse(localStorage.getItem('userLoggedIn'));
            var spanProfileName = document.getElementById('spanProfileName');
            var spanProfileMobile = document.getElementById('spanProfileMobile');
            var spanProfileEmail = document.getElementById('spanProfileEmail');
            var spanProfileProductNum = document.getElementById('spanProfileProductNum');
            var spanProfileDescription = document.getElementById('spanProfileDescription');

            spanProfileName.innerHTML = user.name;
            spanProfileMobile.innerHTML = user.mobile;
            spanProfileEmail.innerHTML = user.email;
            spanProfileProductNum.innerHTML = '4 إعلانات ';
            spanProfileDescription.innerHTML = 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ';

            if (localStorage.getItem('usrPhoto')) {
                imgUserAccount.src = hostUrl + "/Uploads/" + localStorage.getItem('usrPhoto');
            }
        }

        DrawUserProducts(userProducts);


        if (initProfilePage == true) {
            initProfilePage = false;

            $('#linkEditProfile').on('click', function () {
                mainView.router.loadPage({ pageName: 'signup' });
            });

            $("#linkAddPhoto").on("click", function () {
                if (localStorage.getItem('userLoggedIn')) {
                    getImage();
                }

            });

        }
    }
}

function GoToChatPage(page) {
    if (typeof page != 'undefined') {

    }
}

function GoToContactPage(page) {
    if (typeof page != 'undefined') {

        if (initContactPage == true) {
            initContactPage = false;

            var contactInfo = {
                id: 1,
                position: 'المملكة العربية السعودية – الرياض – حي الملز – شارع عبدالله الهمزاني من شارع جرير امام اسواق الحربي المركزيه',
                email: 'info@arosQatar.sa',
                mobile: '00966114987014 / 00966543216521',
                fax: '40554'
            };

            var pContactPosition = document.getElementById('pContactPosition');
            var pContactMobiles = document.getElementById('pContactMobiles');
            var pContactEmail = document.getElementById('pContactEmail');
            var pContactFax = document.getElementById('pContactFax');

            pContactPosition.innerHTML = contactInfo.position;
            pContactMobiles.innerHTML = contactInfo.mobile;
            pContactEmail.innerHTML = contactInfo.email;
            pContactFax.innerHTML = contactInfo.fax;


            $("#btnSendContactMessage").on("click", function () {
                FValidation.ValidateAll('contact', function (res) {
                    if (res == true) {

                    }
                });
            });
        }
    }
}

function GoToAddProductPage(page) {
    if (typeof page != 'undefined') {
        var selectAddProductCategory = document.getElementById('selectAddProductCategory');
        var selectAddProductDuration = document.getElementById('selectAddProductDuration');
        selectAddProductCategory.innerHTML = '';
        selectAddProductDuration.innerHTML = '';

        $('#linkAddProductCategory .item-after').html('');
        $('#linkAddProductDuration .item-after').html('');
        $('#txtAddProductPrice').val('');
        $('#txtAddProductDescription').val('');
        $('#lblProductImage').html('صور الإعلان');
        //$('.lblError').css('display', 'none');
        $('.lblError').removeClass('activeError');
        $('.lblError').removeClass('slideInDown');



        $('#linkBackAddProduct').on('click', function () {
            $('#txtAddProductPrice').val('');
            $('#txtAddProductDescription').val('');
            $('#lblProductImage').html('صور الإعلان');
            mainView.router.loadPage({ pageName: 'categories' });
        });

        myApp.smartSelectAddOption('#linkAddProductCategory select', '<option value="" selected disabled></option>');
        myApp.smartSelectAddOption('#linkAddProductDuration select', '<option value="" selected disabled></option>');

        //GetAllCategories('addProduct', function (res1) {
        //    for (var c = 0; c < allCategories.length; c++) {
        //        myApp.smartSelectAddOption('#linkAddProductCategory select', '<option value="' + allCities[c].Id + '">' + allCities[c].Name + '</option>');
        //    }

        //    $('#linkAddProductCategory').on('click', function () {
        //        myApp.smartSelectOpen('#linkAddProductCategory');
        //    });
        //});

        for (var c = 0; c < allCategories.length; c++) {
            myApp.smartSelectAddOption('#linkAddProductCategory select', '<option value="' + allCategories[c].id + '">' + allCategories[c].name + '</option>');
        }

        allDurations = [];
        allDurations.push({ id: 1, name: '10 أيام' });
        allDurations.push({ id: 2, name: '20 أيام ' });
        allDurations.push({ id: 3, name: 'شهر' });
        allDurations.push({ id: 4, name: 'شهرين' });

        for (var c = 0; c < allDurations.length; c++) {
            myApp.smartSelectAddOption('#linkAddProductDuration select', '<option value="' + allDurations[c].id + '">' + allDurations[c].name + '</option>');
        }

        $('#linkAddProductCategory').on('click', function () {
            myApp.smartSelectOpen('#linkAddProductCategory');
        });
        $('#linkAddProductDuration').on('click', function () {
            myApp.smartSelectOpen('#linkAddProductDuration');
        });

        if (initAddProductPage == true) {
            initAddProductPage = false;

            $('#linkAddProductImage').on('click', function () {
                getImage();
            });

            $('#btnAddProduct').on('click', function () {
                FValidation.ValidateAll('addProduct', function (res) {
                    if (res == true) {
                        var addProductCategory = $('#selectAddProductCategory').val();

                        //var product = {
                        //    'DepartureId': $('#selectLeavePlace option:selected').val(),
                        //    'DestinationId': $('#selectArrivePlace option:selected').val(),
                        //    'DepartureDate': leaveDate[1].toString() + '-' + leaveDate[0].toString() + '-' + leaveDate[2].toString(),
                        //    'DestinatioDate': arriveDate[1].toString() + '-' + arriveDate[0].toString() + '-' + arriveDate[2].toString(),
                        //    'TransportVehicle': $('#addTripTransportVehicle').val()
                        //}

                        //CallService('addProduct', "POST", "api/Product/SaveProduct", product, function (res) {
                        //    if (res != null) {
                        //        initCategoriesPage = true;
                        //        $('#txtAddProductPrice').val('');
                        //        $('#txtAddProductDescription').val('');
                        //$('#lblProductImage').html('صور الإعلان');
                        //        myApp.alert('تم إضافة الإعلان بنجاح .', 'نجاح', function () { mainView.router.loadPage({ pageName: 'categories' }); });
                        //    }
                        //    else {
                        //        myApp.alert('خطأ في إضافة إعلان جديد.', 'خطأ', function () { });
                        //    }
                        //});


                    }
                });
            });
        }


    }
}



myApp.onPageBeforeInit('splash', function (page) {
    GoToSplashPage(page);
}).trigger();

myApp.onPageBeforeAnimation('login', function (page) {
    if (initLoginPage == true) {
        initLoginPage = false;
        GoToLoginPage(page);
    }
}).trigger();

myApp.onPageBeforeAnimation('forgetPass', function (page) {
    GoToForgetPasswordPage(page);
}).trigger();

myApp.onPageBeforeAnimation('signup', function (page) {
    GoToSignUpPage(page);
}).trigger();

myApp.onPageBeforeAnimation('activation', function (page) {
    GoToActivationPage(page);
}).trigger();

myApp.onPageBeforeAnimation('categories', function (page) {
    GoToCategoriesPage(page);
}).trigger();

myApp.onPageBeforeAnimation('products', function (page) {
    GoToProductsPage(page);
}).trigger();

myApp.onPageBeforeAnimation('favourite', function (page) {
    GoToFavouritePage(page);
}).trigger();

myApp.onPageBeforeAnimation('user', function (page) {
    GoToUserPage(page);
}).trigger();

myApp.onPageBeforeAnimation('profile', function (page) {
    GoToProfilePage(page);
}).trigger();

myApp.onPageBeforeAnimation('addProduct', function (page) {
    GoToAddProductPage(page);
}).trigger();

myApp.onPageBeforeAnimation('productDetails', function (page) {
    GoToProductDetails(page);
}).trigger();

myApp.onPageBeforeAnimation('chat', function (page) {
    GoToChatPage(page);
}).trigger();

myApp.onPageBeforeAnimation('contact', function (page) {
    GoToContactPage(page);
}).trigger();

myApp.onPageBeforeAnimation('search', function (page) {
    GoToSearchPage(page);
}).trigger();

myApp.onPageBeforeAnimation('changePassword', function (page) {
    GoToChangePasswordPage(page);
}).trigger();

myApp.onPageBeforeAnimation('resetPassword', function (page) {
    GoToResetPasswordPage(page);
}).trigger();

myApp.init();
