import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStep } from 'src/app/model/testcase.model';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input('step') step: IStep;
  @Input('isfirstStep') isFirstStep: boolean;
  showActionList: boolean;

  constructor(
    private SettingsService: SettingsService
  ) { }

  ngOnInit() {
    // if (this.isFirstStep) { this.showActionList = true; }
    // cause some misleading UI problem
    // solution A : ask for a API for accordion 
    // solution B : go full Angular with only *ngIf but the sweet animation will disappear
    this.step.toDelete = false;
  }

  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.SettingsService.editStepSettings(this.step);
    this.showActionList = !this.showActionList;
  }

  clearFocus(): void {
    console.log("focus out");
    //this.SettingsService.clearFocus();
  }

}