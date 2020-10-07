import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
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
  constructor(private modalCtrl: ModalController) {}

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
}
