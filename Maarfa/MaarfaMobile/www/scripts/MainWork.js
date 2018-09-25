


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
var serviceURL = 'http://maarfaapi.saned-projects.com/';
var hostUrl = 'http://testsaned.webwayeg.com/www/';
//var appToken = '';
var userId = 0;
userId = localStorage.getItem("UID");
var markers = [];
var user;

var allCities = [];
var allCategories = [];
var BackIsClicked = false;
var scrollLoadsBefore = false;
var initLandingPage = true;
var initIndexPage = true;
var initCategoryPage = true;
var initBookDetailsPage = true;
var initTab1 = true;
var initTab2 = true;
var initTab3 = true;
var categoriesBackClicked = false;
var loaderPage;

var clientId = 'consoleApp';
var clientSecret = '123@abc';
var linkBackSearch = false;
var linkBackAddProduct = false;
var initBooksTest = true;



var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});





$$(document).on('pageInit', function (e) {
    page = e.detail.page;

    if (page.name === 'landing') {
        initLandingPage = true;
    }
    else if (page.name === 'index') {
        initIndexPage = true;
    }
    else if (page.name === 'category') {
        initCategoryPage = true;
        initTab1 = true;
        initTab2 = true;
        initTab3 = true;
    }
    else if (page.name === 'book') {
        initBookDetailsPage = true;
    }

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


function CallService(pageName, CallType, MethodName, dataVariables, callback) {
    if (MethodName != "api/Videos/VideosFullSearch" && MethodName != "api/Books/BooksFullSearch" && MethodName != "api/Summaries/SummariesFullSearch"
        && MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api / ContactUs' && MethodName != "api/Videos/" && MethodName != "api/Summaries/"
        && pageName != 'SideMenu') {
        ShowLoader(pageName);
    }

    $.ajax({
        type: CallType,
        url: serviceURL + MethodName,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
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
        if  (MethodName != "api/Videos/VideosFullSearch" && MethodName != "api/Books/BooksFullSearch" && MethodName != "api/Summaries/SummariesFullSearch"
        && MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api / ContactUs'
        && pageName != 'SideMenu') {
            HideLoader();
        }
        callback(res);
    })
        .fail(function (error, textStatus) {
            if (MethodName != "api/Videos/VideosFullSearch" && MethodName != "api/Books/BooksFullSearch" && MethodName != "api/Summaries/SummariesFullSearch"
         && MethodName != 'api/Trip/GetCandidateTrip' && MethodName != 'api / ContactUs'
         && pageName != 'SideMenu') {
                HideLoader();
            }
            console.log("Error in (" + MethodName + ") , Error text is : [" + error.responseText + "] , Error json is : [" + error.responseJSON + "] .");
            var responseText = JSON.parse(error.responseText);

            if (error.status === 401) {
                //RefreshToken(pageName, CallType, 'Token', function (tokenAfterRefresh) {
                //    localStorage.setItem('appToken', tokenAfterRefresh);
                //    CallService(pageName, CallType, MethodName, function (rrrrr) { });
                //});
                //myApp.alert('مدة صلاحية رمز التحقق الخاص بك قد انتهت من فضلك قم بتسجيل الدخول مرة أخري .', 'خطأ', function () {
                //    localStorage.removeItem('appToken');
                //    localStorage.removeItem('USName');
                //    localStorage.removeItem('refreshToken');
                //    localStorage.removeItem('userLoggedIn');
                //    localStorage.removeItem('Visitor');
                //    initLoginPage = true;
                //    mainView.router.loadPage({ pageName: 'login' });
                //});
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




        });
}

function GetContactsDetails(callBack) {
   

    CallService('index', "Get", "api/ContactUs", '', function (result) {
        if (result != null) 

        


        callBack(result);
    });
   
   

    

}
function GetAllSection(callBack) {



    var allSections = [];



    CallService('index', "POST", "api/Categories/GetAll", '', function (result) {
        if (result != null) {
            for (var c = 0; c < result.length; c++) {
                allSections.push({ Id: result[c].Id, Name: result[c].Name });
            }


            callBack(allSections);
        }
    });
}

function loadSideMenuLinks() {

    DrawSidePanel();

}

function DrawIndexPage() {
    
    GetAllSection(function (sections) {




        var divIndex = document.getElementById("divIndex");
        divIndex.innerHTML = "";
        for (var i = 0; i < sections.length; i++) {

            var pIndexLink = document.createElement("p");
            var indexLink = document.createElement("a");
            var iconIndexLink = document.createElement("i");
            var labelIndex = document.createElement("label");
            indexLink.setAttribute("id", "indexLink_" + sections[i].Id);

            indexLink.setAttribute("class", "button button-big button-fill color-dark");
            iconIndexLink.setAttribute("class", "ionicons ion-ios-book");
            labelIndex.innerHTML = sections[i].Name;

            indexLink.appendChild(iconIndexLink);
            indexLink.appendChild(labelIndex);
            pIndexLink.appendChild(indexLink);
            divIndex.appendChild(pIndexLink);


            $('#indexLink_' + sections[i].Id).on('click', function () {
                var elemId = $(this).attr('id');
                var categoryId = elemId.split('_')[1];

                mainView.router.loadPage({ pageName: 'category', query: { categoryId: categoryId } });
            });


        }

    });





}
function DrawBooks(allBooks) {
    
    for (var i = 0; i < allBooks.length; i++) {
        var bookLink = document.createElement("a");
        var bookDiv = document.createElement("div");
        var mainDiv = document.createElement("div");
        var bookImg = document.createElement("img");
        var pbook = document.createElement("p");
        mainDiv.setAttribute("class", "col-50 divBooks ");
        pbook.setAttribute("class","txt")
        bookLink.setAttribute("id", "bookLink_" + allBooks[i].Id);
        bookDiv.setAttribute("class", "card");
        bookImg.setAttribute("src", allBooks[i].Image);
        pbook.innerText = allBooks[i].Name;




        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(pbook);
        bookLink.appendChild(bookDiv);
        mainDiv.appendChild(bookLink);

        divTab1.appendChild(mainDiv);
        $('#bookLink_' + allBooks[i].Id).on('click', function () {
            var elemId = $(this).attr('id');
            var bookId = elemId.split('_')[1];
            mainView.router.loadPage({ pageName: 'book', query: { bookId: bookId } });
        });
    }



}

function DrawVideos(allVideos) {


    

    var videoFrame = document.getElementById("videoFrame");

    for (var i = 0; i < allVideos.length; i++) {

        var videoLink = document.createElement("a");
        var videoDiv = document.createElement("div");
        var mainDiv = document.createElement("div");
        var vedioImg = document.createElement("img");
        var pVideo = document.createElement("p");
        mainDiv.setAttribute("class", "col-100  divVideo");
        videoLink.setAttribute("id", "videoLink_" + allVideos[i].Id);
        videoDiv.setAttribute("class", "card");
        vedioImg.setAttribute("src", allVideos[i].Image);
        pVideo.innerText = allVideos[i].Name;





        videoDiv.appendChild(vedioImg);
        videoDiv.appendChild(pVideo);
        videoLink.appendChild(videoDiv);
        mainDiv.appendChild(videoLink);
        divTab2.appendChild(mainDiv);



        $('#videoLink_' + allVideos[i].Id).on('click', function () {
            var elem = $(this).attr("id");
            var videoId = elem.split("_")[1];
            var clickedLink=this;


            VideoCallService(videoId, function (result) {
                var videoSrc = document.getElementById("videoSrc");
                videoSrc.setAttribute("src", result.Embed);
                myApp.popover(".popover-video",clickedLink);

               






            });



        });


    }
}


function DrawAbstracts(allAbstracts) {

    
    
    for (var i = 0; i < allAbstracts.length; i++) {
        var abstractLink = document.createElement("a");
        var abstractDiv = document.createElement("div");
        var mainDiv = document.createElement("div");
        var abstractImg = document.createElement("img");
        var pAbstract = document.createElement("p");
        mainDiv.setAttribute("class", "col-100  divAbstracts");
        abstractLink.setAttribute("id", "abstractLink_" + allAbstracts[i].Id);
        abstractLink.setAttribute("class", "open-video");
        abstractDiv.setAttribute("class", "card");
        abstractImg.setAttribute("src", allAbstracts[i].Image);
        pAbstract.innerText = allAbstracts[i].Name;




        abstractDiv.appendChild(abstractImg);
        abstractDiv.appendChild(pAbstract);
        abstractLink.appendChild(abstractDiv);
        mainDiv.appendChild(abstractLink);

        divTab3.appendChild(mainDiv);
        $$('#abstractLink_' + allAbstracts[i].Id).on('click', function () {
            var elem = $(this).attr("id");
            var abstractId = elem.split("_")[1];
            var clickedLink = this;

            AbstractCallService(abstractId, function (result) {
                var summaryImg = document.getElementById("summaryImg");
                summaryImg.setAttribute("src", result.Image);
                myApp.popover(".popover-summary", clickedLink);

              


          });


        })



    }

}
function DrawBookDetails(result) {
    var imgDetailBook = document.getElementById("imgDetailBook");
    imgDetailBook.innerHTML = "";

    var divBookName = document.getElementById("divBookName");
    divBookName.innerHTML = "";
    var divBookDetails = document.getElementById("divBookDetails");
    divBookDetails.innerHTML = "";

    

    var pBookName = document.createElement("p");
    var pBookDetails = document.createElement("p");
    var pDownloadLink = document.createElement("p");
    var downloadLink = document.createElement("a");
    var downloadLinkIcon = document.createElement("i");
    imgDetailBook.setAttribute("src", "img/1.jpg");
    imgDetailBook.setAttribute("width", "100%");
    pBookName.innerHTML = result.Name;
    pBookDetails.innerHTML = result.Description
    downloadLink.setAttribute("id", "downloadLink");
    downloadLink.setAttribute("class", "button button-big button-fill color-blue");
    downloadLinkIcon.setAttribute("class", "ionicons ion-android-download");

    divBookName.appendChild(pBookName);
    downloadLink.appendChild(downloadLinkIcon);
    pDownloadLink.appendChild(downloadLink);
    divBookDetails.appendChild(pBookDetails);
    divBookDetails.appendChild(pDownloadLink);



    $('#downloadLink').on('click', function () {

        var ref = cordova.InAppBrowser.open(result.DownloadLink, '_blank', 'location=yes');


    });







}
function DrawSidePanel() {


    var rightPanalDiv = document.getElementById("rightPanalDiv");
    rightPanalDiv.innerHTML = "";
    GetAllSection(function (sections) {

        for (var i = 0; i < sections.length; i++) {
            var mainLink = document.createElement("a");
            var linkIcon = document.createElement("i");
            var linkText = document.createElement("label");
            linkText.innerHTML = sections[i].Name;
            mainLink.setAttribute("id", "mainLink_" + sections[i].Id);
            mainLink.setAttribute("class", "close-panel");
            linkIcon.setAttribute("class", "icon ion-ios-information-outline");
            mainLink.appendChild(linkIcon);
            mainLink.appendChild(linkText);

            rightPanalDiv.appendChild(mainLink)
            $('#mainLink_' + sections[i].Id).on('click', function () {
                var elemId = $(this).attr('id');
                var categoryId = elemId.split('_')[1];
                mainView.router.loadPage({ pageName: 'category', query: { categoryId: categoryId } });


            });


        }
    });




}
function GoToBooks(categoryId) {
    myApp.detachInfiniteScroll($$('#tab1'));

    var divTab1 = document.getElementById("divTab1");
    divTab1.innerHTML = "";
  

    var books = [];
    var loading = false;
    var lastIndex = 0;
    var maxItems = books.length;
    var itemsPerLoad = 9;

    $('.loading img').css('display', '');

    var params = {
        "pageNumber": 1,
        "pageSize": 9,
        "categoryId": categoryId

    };
    CallService('category', "POST", "api/Books/BooksFullSearch", params, function (result) {
        if (result != null && result.length > 0) {
            maxItems = result[0].OverallCount;
            $('#divTab1').show();
            $('#divNotificationTab1').hide();

            DrawBooks(result);
            $('.loading img').css('display', '');
            if (result.length < itemsPerLoad) {
                $$('.loading img').css('display', 'none');

            }
        }
        else {
            $('#divTab1').hide();
            $('#divNotificationTab1').show();
        }
    });


    myApp.attachInfiniteScroll($$('#tab1'));



    if (initTab1 == true) {
        initTab1 = false;



        $$('#tab1').on('infinite', function () {
            lastIndex = $$('#divTab1 div.divBooks').length;
            if (lastIndex > 0) {
                if (loading) return;
                loading = true;

                setTimeout(function () {
                    loading = false;
                    
                    if (lastIndex >= maxItems) {
                        myApp.detachInfiniteScroll($$('#tab1'));

                        $$('.loading img').css('display', 'none');
                        return;
                    }
                    else {
                        $$('.loading img').css('display', '');
                        var params = {
                            "pageNumber": parseInt(parseInt(lastIndex / 9) + 1),
                            "pageSize": 9,
                            "categoryId": categoryId

                        };
                        CallService('category', "POST", "api/Books/BooksFullSearch", params, function (result) {
                            if (result != null && result.length > 0) {

                                maxItems = result[0].OverallCount;
                                DrawBooks(result);
                                lastIndex = $$('#divTab1 div.divBooks').length;
                                if (result.length <= itemsPerLoad) {
                                    $$('.loading img').css('display', 'none');

                                }
                            }
                        });
                    }



                }, 1000);

            }
            


        });

    }
}
function GoToVideos(categoryId) {
    myApp.detachInfiniteScroll($$('#tab2'));

    
   
    var divTab2 = document.getElementById("divTab2");
    divTab2.innerHTML = "";

    var video = [];
    var loading = false;
    var lastIndex = 0;
    var maxItems = video.length;
    var itemsPerLoad = 3;

    $('.loading img').css('display', '');

    var params = {
        "pageNumber": "1",
        "pageSize": 3,
        "categoryId": categoryId

    };
    CallService('category', "POST", "api/Videos/VideosFullSearch", params, function (result) {
        if (result != null && result.length > 0) {
            maxItems = result[0].OverallCount;
            $('#divTab2').show();
            $('#divNotificationTab2').hide();

            DrawVideos(result);
            $('.loading img').css('display', '');
            if (result.length < itemsPerLoad) {
                $$('.loading img').css('display', 'none');

            }
        }
        else {
            $('#divTab2').hide();
            $('#divNotificationTab2').show();
        }
    });


    myApp.attachInfiniteScroll($$('#tab2'));



    if (initTab2 == true) {
        initTab2 = false;



        $$('#tab2').on('infinite', function () {
            lastIndex = $$('#divTab2 div.divVideo').length;
            if (lastIndex>0) {
                if (loading) return;
                loading = true;

                setTimeout(function () {
                    loading = false;
                    
                    if (lastIndex >= maxItems) {
                        myApp.detachInfiniteScroll($$('#tab2'));

                        $$('.loading img').css('display', 'none');
                        return;
                    }
                    else {
                        $$('.loading img').css('display', '');
                        var params = {
                            "pageNumber": parseInt(parseInt(lastIndex / 3) + 1),
                            "pageSize": 3,
                            "categoryId": categoryId

                        };
                        CallService('category', "POST", "api/Videos/VideosFullSearch", params, function (result) {
                            if (result != null && result.length > 0) {
                                maxItems = result[0].OverallCount;
                                DrawVideos(result);
                                lastIndex = $$('#divTab2 div.divVideo').length;
                                if (result.length <= itemsPerLoad) {
                                    $$('.loading img').css('display', 'none');

                                }
                            }
                        });
                    }



                }, 1000);

            }

           

        });



    }
    
}
function GoToAbstracts(categoryId) {
    
    myApp.detachInfiniteScroll($$('#tab3'));

    var divTab3 = document.getElementById("divTab3");
    divTab3.innerHTML = "";

    var abstracts = [];
    var loading = false;
    var lastIndex = 0;
    var maxItems = abstracts.length;
    var itemsPerLoad = 3;

    $('.loading img').css('display', '');

    var params = {
        "pageNumber": 1,
        "pageSize": 3,
        "categoryId": categoryId

    };
    CallService('category', "POST", "api/Summaries/SummariesFullSearch", params, function (result) {
        if (result != null && result.length > 0) {
            maxItems = result[0].OverallCount;
            $('#divTab3').show();
            $('#divNotificationTab3').hide();

            DrawAbstracts(result);
            $('.loading img').css('display', '');
            if (result.length < itemsPerLoad) {
                $$('.loading img').css('display', 'none');

            }
        }
        else {
            $('#divTab3').hide();
            $('#divNotificationTab3').show();
        }
    });


    myApp.attachInfiniteScroll($$('#tab3'));



    if (initTab3 == true) {
        initTab3 = false;



        $$('#tab3').on('infinite', function () {
            lastIndex = $$('#divTab3 div.divAbstracts').length;
            if (lastIndex > 0) {
                if (loading) return;
                loading = true;

                setTimeout(function () {
                    loading = false;
                  
                    if (lastIndex >= maxItems) {
                        myApp.detachInfiniteScroll($$('#tab3'));

                        $$('.loading img').css('display', 'none');
                        return;
                    }
                    else {
                        $$('.loading img').css('display', '');
                        var params = {
                            "pageNumber": parseInt(parseInt(lastIndex / 3) + 1),
                            "pageSize": 3,
                            "categoryId": categoryId

                        };
                        CallService('category', "POST", "api/Summaries/SummariesFullSearch", params, function (result) {
                            if (result != null && result.length > 0) {

                                maxItems = result[0].OverallCount;
                                DrawAbstracts(result);
                                lastIndex = $$('#divTab3 div.divAbstracts').length;
                                if (result.length <= itemsPerLoad) {
                                    $$('.loading img').css('display', 'none');

                                }
                            }
                        });
                    }



                }, 1000);


            }

           

        });

    }
    
}
function GotoContacts() {
    $$('.open-contact').on('click', function () {

        var clickedLink = this;
      
            myApp.popover('.popover-contact', clickedLink);
        
    });
    $$('.popover-contact').on('opened', function () {
       
        CallService('index', "GET", "api/ContactUs", '', function (result) {
            if (result != null)
                $$('#labelMail').text(result.Email);
               $$('#labelCall').text(result.Phone);
               


               
        });


    });
}

    
    
    

function GoToIndexPage(page) {
    if (typeof page != "undefined") {
        GotoContacts();
        loadSideMenuLinks();
        
        DrawIndexPage();
        
  

        if (initIndexPage == true) {
            initIndexPage = false;
        }
    }


}
function GoToCategoryPage(page) {

    if (typeof page != "undefined") {
      
        
     
        categoryId = page.query.categoryId;
        
        GotoContacts();
       
        myApp.showTab('#tab1');
        

        if (categoriesBackClicked == true|| initCategoryPage == true) {
            categoriesBackClicked = false;
          
            
                GoToBooks(categoryId);

          
          
        }
        

        if (initCategoryPage == true) {
            initCategoryPage = false;

            


            $$('#tab1').on('show', function () {
                categoriesBackClicked = false;
         
                GoToBooks(categoryId);

                
                
               

               
            });

            $$('#tab2').on('show', function () {
                 GoToVideos(categoryId);

            });

            $$('#tab3').on('show', function () {
                myApp.detachInfiniteScroll($$('.infinite-scroll'));

               
                GoToAbstracts(categoryId);

                if (initTab3 == true) {
                    initTab3 = false;


                }

            });

            $('#linkBackCategories').on('click',function(){
                categoriesBackClicked = true;

                mainView.router.loadPage({ pageName: 'index' });
            });
           
        }
    }


}
function GoToBookDetailsPage(page) {
    if (typeof page != "undefined") {
        GotoContacts();
        
        var bookId = page.query.bookId;
       
        CallService('book', "GET", "api/Books/" + bookId, "", function (result) {
            if (result != null ) {

                DrawBookDetails(result);
            }


        });

        

        
        



        if (initBookDetailsPage == true) {
            initBookDetailsPage = false;

        }
    }



}
function VideoCallService( videoId,callBack){
   
    CallService('category', "GET", "api/Videos/" + videoId, "", function (result) {
        if (result != null) {
         

           callBack(result);

            
        }

    });

}
function AbstractCallService(AbstractId, callBack) {

    CallService('category', "GET", "api/Summaries/" + AbstractId, "", function (result) {
        if (result != null) {


            callBack(result);


        }

    });

}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("window.open works well");
    
}




myApp.onPageBeforeAnimation('landing', function (page) {

}).trigger();

myApp.onPageBeforeAnimation('index', function (page) {

   
    GoToIndexPage(page);
    
    
   

}).trigger();

myApp.onPageBeforeAnimation('category', function (page) {

    

    GoToCategoryPage(page);
    
   





}).trigger();

myApp.onPageBeforeAnimation('book', function (page) {
    GoToBookDetailsPage(page);
    


}).trigger();


myApp.init();
