import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-carousel-ui',
    templateUrl: './carousel-ui.component.html',
    styleUrls: ['./carousel-ui.component.less'],
    standalone: true
})
export class CarouselUiComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.imgid=0
  }

  imgid:number = 0;
  interval:number = 8000; // duration(speed) of the slide
  timer = window.setInterval(()=> {this.changeSlide(0,'auto')}, this.interval);

  changeSlide(slideId:number,type:string):void { //смена слайда баннера
      if(type=='click')
      {
        var imgs = document.querySelectorAll<HTMLElement>('.slider img');
        var dots = document.querySelectorAll<HTMLElement>('.dot');
        var currentImg = 0; // index of the first image 
        for (var i = 0; i < imgs.length; i++) { // reset
          imgs[i].style.opacity = '0';
          dots[i].className = dots[i].className.replace(' active', '');
        }
      if (slideId != undefined) {
        clearInterval(this.timer);
        this.timer = window.setInterval(()=> {this.changeSlide(0,'auto')}, this.interval);
        currentImg = slideId;
    }
      imgs[currentImg].style.opacity = '1';
      dots[currentImg].className += ' active';
    } else {
        var imgs = document.querySelectorAll<HTMLElement>('.slider img');
        var dots = document.querySelectorAll<HTMLElement>('.dot');
        var currentImg = 0; // index of the first image 
        for (var i = 0; i < imgs.length; i++) { // reset
          imgs[i].style.opacity = '0';
          dots[i].className = dots[i].className.replace(' active', '');
        }

        if(this.imgid<2){
          this.imgid++;
          currentImg = this.imgid;
        } else{
          this.imgid=0;
          currentImg = this.imgid;
        }

        imgs[currentImg].style.opacity = '1';
        dots[currentImg].className += ' active';
      }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

}
