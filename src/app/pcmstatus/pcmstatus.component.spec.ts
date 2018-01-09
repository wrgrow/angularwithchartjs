import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcmstatusComponent } from './pcmstatus.component';

describe('PcmstatusComponent', () => {
  let component: PcmstatusComponent;
  let fixture: ComponentFixture<PcmstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcmstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcmstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
