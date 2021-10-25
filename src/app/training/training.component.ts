import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModelBuilderService } from '../core/services/model-builder.service';
import * as tf from "@tensorflow/tfjs";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";
import { Router } from '@angular/router';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, AfterViewInit {
  labels = this.modelBuilder.labels;
  labelImages: {
    [label: string]: number;
  } = {};
  selectedLabel: string = this.labels[0];
  cam?: WebcamIterator;
  @ViewChild('videoEl', {
    read: ElementRef
  }) videoEl!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasEl', {
    read: ElementRef
  }) canvasEl!: ElementRef<HTMLCanvasElement>;
  constructor(private readonly modelBuilder: ModelBuilderService,
    private readonly router: Router) {

  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    tf.data.webcam(this.videoEl.nativeElement, {
    }).then(cam => {
      this.cam = cam;
    });
  }

  async captureImage() {
    const canvas = this.canvasEl.nativeElement;
    const context = canvas.getContext('2d');
    context?.drawImage(this.videoEl.nativeElement, 0, 0);
    await this.modelBuilder.classify(this.selectedLabel, canvas);
    this.labelImages[this.selectedLabel] = this.labelImages[this.selectedLabel] ? (this.labelImages[this.selectedLabel] + 1) : 1;
    setTimeout(() => {
      context?.clearRect(0, 0, canvas.width, canvas.height);
    }, 1500)
  }

  startPredicting() {
    this.router.navigate(['/predict'])
  }
}
