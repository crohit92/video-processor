import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModelBuilderService } from '../core/services/model-builder.service';
import * as tf from "@tensorflow/tfjs";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit, AfterViewInit {
  prediction: string = '';
  @ViewChild('videoEl', {
    read: ElementRef
  }) videoEl!: ElementRef<HTMLVideoElement>;
  constructor(private readonly modelBuilder: ModelBuilderService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    const webcam = await tf.data.webcam(this.videoEl.nativeElement);
    const classify = async () => {
      const img = await webcam.capture();
      const prediction = await this.modelBuilder.predict(img);
      this.prediction = prediction as any;
      // this.resultOutputEl.nativeElement.innerText = `Object: ${result.className}. Probability: ${result.probability}`;
      // Dispose the tensor to release the memory.
      img.dispose();
      // Wait for 1 second
      await new Promise<void>((resolve) => {
        setTimeout(() => { resolve(); }, 1000);
      })
      requestAnimationFrame(classify);
    };
    requestAnimationFrame(classify);
  }

}
