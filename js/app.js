var slider = function () {};
slider.init = function () {
    this.defineProps();
    this.data.forEach(this.preloadImages.bind(this));
    this.bindEvents();
    this.fillDots();
};

slider.defineProps = function () {
    this.el = '.second-slider';
    this.$el = document.querySelector(this.el);
    this.dots = this.el+'__carousel > .item';
    this.$dots = this.$el.querySelectorAll(this.dots);
    this.wrapper = this.el+'__wrapper';
    this.$wrapper = this.$el.querySelector(this.wrapper);
    this.slide = '.slide';
    this.$slide = this.$el.querySelector(this.slide);
    this.$slideImage = this.$slide.querySelector('.slide__image');
    this.$slideWrapperText = this.$slide.querySelector('.slide__wrapper');
    this.mask = this.slide+'__mask';
    this.$mask = this.$slide.querySelector(this.mask);
    this.markupMask = 'slide__mask';
    this.$activeDot = this.$el.querySelector(this.dots+'--current');
    this.index = this.$activeDot.dataset.index;
    this.textTemplate = document.getElementById('lorem-template').innerHTML;
    this.titleTemplate = 'Nom du nouveau modèle';
    this.isTransitionning = false;
    this.durations = {
        mask: 450,
        wrapper: 700
    }
    var text = this.textTemplate;
    var title = this.titleTemplate;
    this.data = [
        {img:'img/voiture1.jpg',title: title,text: text,alt:'Audi R8'},
        {img:'img/voiture2.jpg',title: title,text: document.getElementById('cup-template').innerHTML,alt:'Tesla'},
        {img:'img/voiture3.jpg',title: title,text: document.getElementById('cup-template2').innerHTML,alt:'Maserati'}
    ]
};
slider.goTo = function (index) {
    index = index || this.index;
    this.changeText();
    this.moveMask();
    this.isTransitionning = true;
    setTimeout(this.changeSlide.bind(this),this.durations.mask+200);
};

slider.getPrev = function () {
    if(!this.isTransitionning) {
        var currDot = this.$el.querySelector(this.dots+'--current');
        var currDotIndex = currDot.dataset.index;
        if(this.index>1 && this.index<=3) {
            this.index--;
        } else if(this.index==1) {
            this.index=3;
        }
        currDot.classList.remove('item--current');
        if(currDotIndex<=3 && currDotIndex>1) {
            currDot.previousElementSibling.classList.add('item--current');
        } else if(currDotIndex==1) {
            this.$el.querySelector('.item[data-index="3"]').classList.add('item--current');
        }
        this.isTransitionning = true;
        this.changeText();
        this.moveMask();
        this.isTransitionning = true;
        setTimeout(this.changeSlide.bind(this),this.durations.mask+200);
    }
};

slider.getNext = function () {
    if(!this.isTransitionning) {
        var currDot = this.$el.querySelector(this.dots+'--current');
        var currDotIndex = currDot.dataset.index;
        if(this.index<3) {
            this.index++;
        } else if(this.index==3) {
            this.index=1;
        }
        currDot.classList.remove('item--current');
        if(currDotIndex>=1 && currDotIndex<3) {
            currDot.nextElementSibling.classList.add('item--current');
        } else if(currDotIndex==3) {
            this.$el.querySelector('.item[data-index="1"]').classList.add('item--current');
        }
        this.changeText();
        this.moveMask();
        this.isTransitionning = true;
        setTimeout(this.changeSlide.bind(this),this.durations.mask+200);
    }
};

slider.moveMask = function () {
    if(!this.$mask.classList.contains('slide__mask--done')
        && !this.$mask.classList.contains('slide__mask--right')
        && !this.$mask.classList.contains('slide__mask--left')) {
        this.$mask.classList.add('slide__mask--left')
    } else if(this.$mask.classList.contains('slide__mask--left')) {
        this.$mask.classList.add('slide__mask--done')
        setTimeout(this.changeMask.bind(this),this.durations.mask);
    }
}

slider.changeSlide = function() {
    var img = this.data[this.index-1].img;
    var alt = this.data[this.index-1].alt
    var imageSlide = this.$slideImage.querySelector('img');
    imageSlide.setAttribute('src',img);
    imageSlide.setAttribute('alt',alt);
    this.$slideImage.style.backgroundImage = 'url("'+img+'")';
    this.moveMask();
    this.isTransitionning = false;
}

slider.changeMask = function () {
    this.$mask.remove();
    var newMask = document.createElement('div');
    newMask.classList.add(this.markupMask);
    this.$slideImage.appendChild(newMask);
    this.$mask = newMask;
}

slider.changeText = function () {
    var title = this.data[this.index-1].title;
    var text = this.data[this.index-1].text;
    var wrapper = this.$slideWrapperText;
    wrapper.classList.add('slide__wrapper--hidden');
    setTimeout(function () {
        wrapper.querySelector('.slide__title').textContent = title;
        wrapper.querySelector('.slide__text').textContent = text;
        wrapper.classList.remove('slide__wrapper--hidden');
    },this.durations.wrapper)
}

slider.bindEvents = function() {
    this.$el
        .querySelector(this.el+'__arrow--left')
        .addEventListener('click',this.getPrev.bind(this));
    this.$el
        .querySelector(this.el+'__arrow--right')
        .addEventListener('click',this.getNext.bind(this));
    var i = 0;
    var dotsLength = this.$dots.length;
    for(i;i<dotsLength;i++) {
        this.$dots[i].addEventListener('click',this.clickDot.bind(this));
    }
};

slider.clickDot = function (ev) {
    if(ev.target.classList.contains('item__inner')) {
        target = ev.target.parentNode;
    } else if(ev.target.classList.contains('item')) {
        target = ev.target;
    }
    if(target.classList.contains('item--current')) {
        return;
    }
    var i = 0;
    var len = this.$dots.length;
    for(i;i<len;i++) {
        this.$dots[i].classList.remove('item--current');
    }
    target.classList.add('item--current')
    this.index = target.dataset.index;
    this.goTo(this.index);
}

slider.preloadImages = function (object) {
    var el = document.createElement('div');
    el.style.backgroundImage = 'url("'+object.img+'")';
    el.style.display = 'none';
    document.body.appendChild(el);
};

slider.fillDots = function () {
    var i = 0;
    var len = this.data.length;
    for(i;i<len;i++) {
        var img = this.data[i].img;
        this.$dots[i].firstChild.style.backgroundImage = 'url("'+img+'")'
    }
}
slider.init();

var canvasManager = {
    el: document.querySelector('canvas'),
    green: '#0cff56',
    lineNumber: 6,
    // can't read 01 as an int.
    monthRange: [10,11,12,'01','02'],
    sellCoords: [],
    data: {
        ventes: [
            {"10-16": 1},
            {"11-16": 3},
            {"12-16": 5},
            {"01-17": 3},
            {"02-17": 4}
        ],
        commandes: [
            {"10-16": 0},
            {"11-16": 4},
            {"12-16": 0},
            {"01-17": 5},
            {"02-17": 0}
        ],
        stock: [
            {"10-16": 4},
            {"11-16": 5},
            {"12-16": 1},
            {"01-17": 4},
            {"02-17": 1}
        ]
    },
    init: function () {
        this.context = this.el.getContext('2d');
        this.width = this.el.parentNode.offsetWidth;
        this.height = parseInt(this.el.getAttribute('height'));
        this.el.setAttribute('width',this.width);
        this.monthCoords = this.getMonthCoords();
        this.yAxisOffset = this.height/this.lineNumber;
        this.drawLines();
        this.drawPoints();
        this.makeMovePattern();
        this.drawCurve();
    },
    drawTriangles: function () {
        var i = 0;
        var datas = this.data.commandes;
        var delta = {x: 5,y: 4};
        var iteration,keys,x,y;
        for (i; i < datas.length; i++) {
            iteration = datas[i];
            property = Object.keys(iteration)[0];
            // Extracting the 2 first characters of the property name of the current object iterated.
            x = parseFloat(this.monthCoords[property.substring(0,2)]);
            y = parseFloat(this.height-(iteration[property]*this.yAxisOffset));
            this.context.fillStyle = 'blue';
            this.context.beginPath();
            this.context.moveTo(x-delta.x, y+delta.y/2);
            this.context.lineTo(x, y-delta.y-delta.y);
            this.context.lineTo(x+delta.x, y+delta.y);
            this.context.lineTo(x-delta.x, y+delta.y);
            this.context.fill();
        }
    },
    makeMovePattern: function () {
        var obj = this.sellCoords;
        this.schema = [];
        if(obj.length>=2) {
            var index = 0;
            var direction = obj[0].y > obj[1].y ? 'up' : 'down';
            for (index; index <= obj.length; index++) {
                for (var i = index+1; i < obj.length; i++) {
                    if(i==index+1) {
                        var ref = index;
                    } else if(i>index+1) {
                        ref = i-1;
                    }
                    var a = obj[ref].y;
                    var b = obj[i].y;
                    if(direction=="up" && a < b) {
                        direction = 'down';
                        this.schema.push({start:obj[index].index ,end:obj[ref].index});
                        console.log(ref+'up');
                        index = ref;
                    }
                    if(direction=="down" && a > b) {
                        direction = 'down';
                        this.schema.push({start:obj[index].index ,end:obj[ref].index});
                        console.log(ref+'down');
                        index = ref;
                    }
                }
                // For last move.
                if(index==obj.length) {
                    this.schema.push({start:obj[obj.length-2].index ,end:obj[obj.length-1].index});
                }
            }
        }
    },
    drawSquares: function () {
        var i = 0;
        var datas = this.data.stock;
        var iteration,keys,x,y,property,size;
        for (i; i < datas.length; i++) {
            iteration = datas[i];
            property = Object.keys(iteration)[0];
            // Extracting the 2 first characters of the property name of the current object iterated.
            x = this.monthCoords[property.substring(0,2)];
            y = this.height-(iteration[property]*this.yAxisOffset)
            size = 10;
            this.context.fillStyle = 'white';
            this.context.beginPath();
            this.context.rect(x-size/2,y-size/2,size,size);
            this.context.fill();
        }
    },
    drawLines: function () {
        var lineOffset = (this.el.offsetHeight/this.lineNumber).toFixed(2);
        this.context.strokeStyle = 'rgba(255,255,255,0.3)';
        var i = 0;
        var offset;
        for (i; i <= this.lineNumber; i++) {
            /**
            * Because of the line width i have to draw the first line at y=lineWidth
            * otherwise half is out of the canvas.
            */
            offset = i > 0 ? i*lineOffset : 1;
            this.context.beginPath();
            this.context.moveTo(0,offset);
            this.context.lineTo(this.width,offset);
            this.context.stroke();
        }
    },
    getMonthCoords: function () {
        var i = 0;
        var coords = {};
        var monthLen = this.monthRange.length;
        var monthOffset = this.width / monthLen;
        var pointOffset;
        for (i; i < monthLen; i++) {
            pointOffset = i > 0 ? (i+1)*monthOffset-monthOffset/2 : monthOffset/2
            coords[this.monthRange[i]] = pointOffset;
        }
        return coords;
    },
    drawCircles: function () {
        var i = 0;
        var datas = this.data.ventes;
        var iteration,keys,x,y,property;
        for (i; i < datas.length; i++) {
            iteration = datas[i];
            property = Object.keys(iteration)[0];
            // Extracting the 2 first characters of the property name of the current object iterated.
            x = this.monthCoords[property.substring(0,2)];
            y = this.height-(iteration[property]*this.yAxisOffset)
            this.context.fillStyle = this.green;
            this.context.beginPath();
            this.context.arc(x,y,5,Math.PI*0/180,Math.PI*360/180);
            this.context.fill();
            // Pushing coords of point to save them for the curve.
            this.sellCoords.push({x:x,y:y,index:i+1});
        }
    },
    drawCurve: function () {

    },
    curve: function (x,y,x2,y2) {
        this.context.strokeStyle = 'black';
        this.context.fillStyle = 'black';
        this.context.beginPath();
        // To place the curve a bit above the point.
        this.context.moveTo(x,y);
        this.context.quadraticCurveTo(x2, y2, x2,y2);
        this.context.stroke();
    },
    drawPoints:function () {
        this.drawCircles();
        this.drawTriangles();
        this.drawSquares();
    }
}

canvasManager.init();
