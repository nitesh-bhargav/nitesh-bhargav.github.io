var obj, localCounter = 0, preloadflag = false;
var catboisObj = {
    imgArray : [],
    counter : 0,
    url : "https://api.catboys.com/img",
    class : 'catbois'
};

var waifuObj = {
    imgArray : [],
    counter : 0,
    url : "https://api.waifu.im/random/",
    class : 'waifus'
}

function run(obj) { 
  return new Promise(function(resolve, reject){

    var xhr = new XMLHttpRequest();
    var url = obj.url;
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) { 
           resolve(responseMain(this));
        } else {
            reject(this.status);
        }
    }
});
}

function responseMain(x){
    var formattedJSON = JSON.parse(x.responseText.trim());

     //Push image URL into an Array
    if(obj.class == 'catbois') {
        obj.imgArray.push(formattedJSON.url);
    } 
    else if(obj.class == 'waifus'){
        obj.imgArray.push(formattedJSON.images[0].url);
    }
    
        CreateElementX();

    //loop for 5 images
    if (obj.counter<5){
        obj.counter++;
        run(obj);
    } else {
        obj.counter++; 
        //show switch api after all 5 are loaded
        document.getElementsByClassName('switch-api')[0].style.display = 'block';
    }

}

function CreateElementX () {

                //Create a div and attach it to container
                var img = document.createElement('div'),
                    imgcontainer = document.getElementById('imgcontainer');
                
                //attach image to div
                img.style.backgroundImage = "url("+obj.imgArray[obj.counter]+")";
                img.className += obj.class;
                img.id = obj.class +'-'+ obj.counter;

                img.addEventListener('click',function (){
                    document.getElementsByClassName('floating-bg')[0].style.backgroundImage = this.style.backgroundImage;
                    localCounter = parseInt(this.id.split('-')[1]);
                });

                imgcontainer.append(img);

                if(preloadflag == true){
                    hideImages(waifuObj.class);
                }
            if(obj.counter == 0 && preloadflag == false){
             document.getElementsByClassName('floating-bg')[0].style.backgroundImage = "url("+obj.imgArray[0]+")";
            }
            
}

//Initial Run
window.onload = function (){
    document.getElementsByClassName('main-container')[0].style.height = window.innerHeight + 'px';
    document.getElementsByClassName('page1')[0].style.height = window.innerHeight + 'px';
    obj = catboisObj;
    run(obj);
    preloadWifus();
    function resetCatbois(){ 
    setTimeout(function(){
        if(waifuObj.counter > 5){
            preloadflag = false;
            obj = catboisObj;             
            } else{resetCatbois();}
    },1000);
    }
    resetCatbois();
}

function preloadWifus (){
    setTimeout(function(){
        if(catboisObj.counter > 5){
            preloadflag = true;
            obj = waifuObj;
             run(obj);
            } else{preloadWifus();}
    },1000);
}

//Scroll Click
document.getElementsByClassName('right-arrow')[0].addEventListener('click',function(){
    run(obj);
    localCounter ++;
    var Interval1 = setInterval(function(){
            if(obj.imgArray[localCounter]!== undefined){
            document.getElementsByClassName('floating-bg')[0].style.backgroundImage = "url("+obj.imgArray[localCounter]+")";
            imgcontainer.scrollBy(300,0);
            clearInterval(Interval1);
            }
    },500);
});

document.getElementsByClassName('left-arrow')[0].addEventListener('click',function(){
    imgcontainer.scrollBy(-300,0);
    if(localCounter !== 0 ){localCounter --;}
    document.getElementsByClassName('floating-bg')[0].style.backgroundImage = "url("+obj.imgArray[localCounter]+")";
});


document.getElementById('switch-api-btn').addEventListener('click',function(){
    var txtLabel = document.getElementById('txtlbl'),
        txtSwitchBtn = document.getElementById('switch-api-btn');

    localCounter = 0;
    document.getElementsByClassName('switch-api')[0].style.display = 'none';

    if(obj.class == 'catbois') //switch to wifus
    {
    obj = waifuObj;
    run(obj);
    showImages(waifuObj.class);
    hideImages(catboisObj.class);  
    txtLabel.innerText ='Anime Girls';
    txtSwitchBtn.classList = 'switchbtn switchto-catboi-btn';
    }else if(obj.class == 'waifus')  //switch to catbois
    {
    obj = catboisObj;
    run(obj);
    showImages(catboisObj.class);
    hideImages(waifuObj.class);
    txtLabel.innerText='Catbois';
    txtSwitchBtn.classList = 'switchbtn switchto-wifus-btn';
    }
    document.getElementsByClassName('floating-bg')[0].style.backgroundImage = "url("+obj.imgArray[0]+")";
});

function hideImages(x){
    var ele = document.getElementsByClassName(x);
    for(var i=0; i<ele.length;i++){
        ele[i].style.display = 'none';
    }
}

function showImages(x){
    var ele = document.getElementsByClassName(x);
    for(var i=0; i<ele.length;i++){
        ele[i].style.display = 'block';
    }
}
