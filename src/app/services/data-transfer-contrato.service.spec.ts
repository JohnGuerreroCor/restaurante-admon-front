import { TestBed } from '@angular/core/testing';

import { DataTransferContratoService } from './data-transfer-contrato.service';

describe('DataTransferContratoService', () => {
  let service: DataTransferContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransferContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
