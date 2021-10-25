import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('myStream',{
    read: ElementRef
  }) streamOutputEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('result',{
    read: ElementRef
  }) resultOutputEl!: ElementRef<HTMLLabelElement>;
  classifier = knnClassifier.create();

  constructor(private readonly renderer:Renderer2) { }

  ngAfterViewInit() { }

  async loadModel() {
    return mobilenet.load();
  }

  async startProcessing() {
    const model = await this.loadModel();
    const webcam = await tf.data.webcam(this.streamOutputEl.nativeElement);
    const classify = async () => {
      const img = await webcam.capture();
      const [result] = await model.classify(img);
      this.resultOutputEl.nativeElement.innerText = `Object: ${result.className}. Probability: ${result.probability}`;
      // Dispose the tensor to release the memory.
      img.dispose();
      // Wait for 1 second
      await new Promise<void>((resolve)=>{
        setTimeout(()=>{resolve();},1000);
      })
      requestAnimationFrame(classify);
    };
    requestAnimationFrame(classify);
      
  }

  stopProcessing() {
    // this.processing.next(false);
  }
}
