var slider = function () {
}

slider.init = function () {
    this.defineProps();
    this.bindEvents();
}

slider.defineProps = function () {
    this.el = '.second-slider';
    this.dots = this.el+'__carousel > .item';
    this.$el = document.querySelector(this.el);
    this.$dots = this.$el.querySelectorAll(this.dots);
    this.wrapper = this.el+'__wrapper';
    this.$wrapper = document.querySelector(this.wrapper);
    this.slides = '.slide';
    this.$slides = this.$el.querySelectorAll(this.slides);
    this.$activeDot = document.querySelector(this.dots+'--current');
    this.index = this.$activeDot.dataset.index;
    this.autoPlay = true;
    this.autoPlayDelay = 4000;
}
slider.goTo = function (index) {
    // Parameter fallback.
    index = index || this.index;
    this.index = index;
}

slider.getNext = function () {
    this.index++
    console.log("next");
}

slider.getPrev = function () {
    this.index--
    console.log("prev");
}

slider.resize = function () {

}

slider.getSlideInfos = function () {
    
}


slider.bindEvents = function() {
    this.$el
        .querySelector(this.el+'__arrow--left')
        .addEventListener('click',this.getPrev.bind(this));
    this.$el
        .querySelector(this.el+'__arrow--right')
        .addEventListener('click',this.getNext.bind(this));
}
slider.init();