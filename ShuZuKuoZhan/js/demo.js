var personArr = [{
        name: '刘小华',
        src: '1.jpg',
        sex: 'male',
        des: '漂亮的女孩子'
    },
    {
        name: '王花',
        src: '2.jpg',
        sex: 'male',
        des: '漂亮的程序猿'
    },
    {
        name: '陈军',
        src: '3.jpg',
        sex: 'female',
        des: '我是一个学霸'
    },
    {
        name: '王华',
        src: '4.jpg',
        sex: 'female',
        des: '我喜欢游泳'
    },
    {
        name: '陈思思',
        src: '5.jpg',
        sex: 'male',
        des: '我喜欢看电影'
    },
    {
        name: '陈学习',
        src: '6.jpg',
        sex: 'female',
        des: '我爸我妈爱学习'
    },
    {
        name: '王美丽',
        src: '7.jpg',
        sex: 'male',
        des: '我妈是美丽得妈妈'
    }
];

// dom 感受事件发生 => 更改状态 => 影响视图
// 需求的增加 事件越来越多 状态越来越多 管理状态 合并行为

var oUl = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByClassName('sText')[0];

store.subscribe(function() {
    // 更新页面试图
    RenderPage(lastFilterArr(personArr));
})
store.getState('sex')

//过滤全局状态
var state = {
    text : '',
    sex : 'all'
}
// var filterText = '';
// var filterSex = 'all';
// 数据渲染页面
function RenderPage(data) {
    //遍历
    var htmlStr = '';
    oUl.innerHTML = '';
    data.forEach(function (ele, index, self) {
        htmlStr = htmlStr + '<li>\
        <img src="./img/' + ele.src + '">\
        <p class="name">' + ele.name + '</p>\
        <p class="des">' + ele.des + '</p>\
        </li>'
    })
    // console.log(htmlStr);
    oUl.innerHTML = htmlStr;
}

RenderPage(personArr);

//  防抖
function debounce(handler,delay) {
    var timer = null;
    return function(){
        var self = this;
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            handler.apply(self,arg);
        },delay)
    }
}

// add input actions
oInput.oninput = debounce(function () { 
    store.dispatch({type: 'text', value: this.value});
}, 500)



//btn style
var oBtnArr = [].slice.call(document.getElementsByClassName('btn'));
var lastActiveBtn = oBtnArr[0];
oBtnArr.forEach(function (ele, index, self) {
    ele.onclick = function () {
        changeActive(this);
        store.dispatch({type: 'sex', value: this.getAttribute('sex')});
        // var newArr = filterArrBySex(personArr, state.sex);
        // var newArr2 = filterArrByText(newArr, state.text);
        // RenderPage(filterArrBySex(personArr, this.getAttribute('sex')));
        // RenderPage(lastFilterArr(personArr));
    }
});

function changeActive(curActiveBtn) {
    curActiveBtn.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = curActiveBtn;
}


