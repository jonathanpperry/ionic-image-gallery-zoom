import { ChangeDetectorRef, Component } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { ImageModalPage } from "../image-modal/image-modal.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true,
  };

  zoomActive = false;
  zoomScale = 1;

  sliderZoomOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
    zoom: {
      maxRatio: 5,
    },
    on: {
      zoomChange: (scale, imageEl, sideEl) => {
        this.zoomActive = true;
        this.zoomScale = scale / 5;
        this.changeDetectorRef.detectChanges();
      },
    },
  };

  constructor(
    private modalCtrl: ModalController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  async openPreview(img) {
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: "transparent-modal",
      componentProps: {
        img,
      },
    });
    modal.present();
  }

  touchStart(card) {
    card.el.style["z-index"] = 11;
  }

  async touchEnd(zoomslides: IonSlides, card) {
    const slider = await zoomslides.getSwiper();
    const zoom = slider.zoom;
    zoom.out();

    this.zoomActive = false;
    card.el.style["z-index"] = 9;
    this.changeDetectorRef.detectChanges();
  }
}
