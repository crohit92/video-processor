import { TestBed } from '@angular/core/testing';

import { ModelBuilderService } from './model-builder.service';

describe('ModelBuilderService', () => {
  let service: ModelBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
