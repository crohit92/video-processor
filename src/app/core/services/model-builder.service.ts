import { Injectable } from '@angular/core';
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as mobileNet from "@tensorflow-models/mobilenet";
import { TFHUB_SEARCH_PARAM } from '@tensorflow/tfjs-converter/dist/executor/graph_model';
import { Rank, Tensor } from '@tensorflow/tfjs-core';
@Injectable({
  providedIn: 'root'
})
export class ModelBuilderService {
  private _labels: string[] = [];
  public static classifier = knnClassifier.create();
  private model?: mobileNet.MobileNet

  constructor() {
    this._labels = JSON.parse(localStorage.getItem('labels') ?? '[]') ?? [];
  }

  public get labels() {
    return this._labels;
  }
  public set labels(labels: string[]) {
    this._labels = labels;
    localStorage.setItem('labels', JSON.stringify(labels));
  }
  public loadModel() {
    return this.model ? Promise.resolve(this.model) : mobileNet.load().then(model => {
      this.model = model;
      return model;
    });
  }

  classify(label: string, image: Tensor<Rank> | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
    return this.loadModel().then(() => {
      const activation = this.model!.infer(image, true);
      ModelBuilderService.classifier.addExample(activation, label);
    });
    // image.dispose();
  }

  async predict(image: Tensor<Rank>) {
    const activation = this.model!.infer(image, true);
    return await ModelBuilderService.classifier.predictClass(activation);
  }

  saveModel() {
    // ModelBuilderService.classifier.
  }
}
