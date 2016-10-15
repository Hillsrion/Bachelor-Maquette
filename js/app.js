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
    iconSize: 15,
    green: '#0cff56',
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
        this.el.setAttribute('width',this.el.parentNode.offsetWidth);
        this.drawPoint();
    },
    drawPoint: function () {
        this.context.arc(this.iconSize, this.iconSize, 5, Math.PI*0/180, Math.PI*360/180);
        this.context.fillStyle = 'blue';
        this.context.fill();
    }
}

canvasManager.init();
