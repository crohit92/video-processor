import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelBuilderService } from '../core/services/model-builder.service';

@Component({
  selector: 'app-identifiables',
  templateUrl: './identifiables.component.html',
  styleUrls: ['./identifiables.component.scss']
})
export class IdentifiablesComponent implements OnInit {

  private _labelControls = new FormArray([]);
  public get labelControls() {
    return this._labelControls.controls as FormControl[];
  }
  constructor(private readonly modelBuilder:ModelBuilderService,
    private readonly router:Router) { }

  ngOnInit(): void {
  }

  addLabel() {
    this._labelControls.push(new FormControl(''));
  }

  removeAt(index:number) {
    this._labelControls.removeAt(index);
  }

  reset() {
    const length = this.labelControls.length;
    for(let index=0;index<length;index++) {
      this._labelControls.removeAt(0);
    }
  }

  continue() {
    this.modelBuilder.labels = this.labelControls.map(c=>c.value);
    this.router.navigate(['/training'])
  }
  
}
