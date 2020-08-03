//加载完成
window.onload = function() {
	change(0)
}

//手机列表
document.getElementById('button').onclick = function(){
	document.getElementById('menu').setAttribute('style', 'display: block')
	document.getElementById('content').onclick = function(){
		document.getElementById('menu').setAttribute('style', 'display: none')
	}
}

//切换壁纸
var set = document.getElementsByClassName('set_list');
set[0].onclick = function() {
	if(!this.classList.contains('disabled')) {
		var idx = this.getAttribute('data-idx')
		change(idx)
	}
}

set[1].onclick = function() {
	if(!this.classList.contains('disabled')) {
		var idx = this.getAttribute('data-idx')
		change(idx)
	}
}

//切换
function change (idx) {
	document.getElementsByClassName('loader')[0].setAttribute('style', 'display: block')
	set[0].classList.remove('disabled')
	set[1].classList.remove('disabled')
	var url = '/bing.php'
	var arr = {idx: idx}
	Ajax('post', url, arr, function(data){
		var data = JSON.parse(data)
	    document.getElementsByClassName('date')[0].innerHTML = data.date
	    document.getElementsByClassName('disc')[0].innerHTML = data.disc
	    document.getElementsByClassName('fixedbg')[0].setAttribute('style', 'background-image: url(' + data.url + ')')
		document.getElementsByClassName('loader')[0].setAttribute('style', 'display: none')
	});
	if(idx >= 0 && idx <= 7) {
		set[0].setAttribute('data-idx', Number(idx) + 1)
		set[1].setAttribute('data-idx', Number(idx) - 1)				
		if(idx == 7) {
			set[0].classList.add('disabled')
		}
		if(idx == 0) {
			set[1].classList.add('disabled')
		}
	}
}

//ajax
function Ajax(type, url, data, success, error){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }		 
    var type = type.toUpperCase();
    var random = Math.random();		 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }		 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();		
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(error){
                    error(xhr.status);
                }
            }
        }
    }
}