import { Component, OnInit } from '@angular/core';
import { ModelBuilderService } from '../core/services/model-builder.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  labels = this.modelBuilder.labels;
  constructor(private readonly modelBuilder:ModelBuilderService) { }


  ngOnInit(): void {
  }

}
