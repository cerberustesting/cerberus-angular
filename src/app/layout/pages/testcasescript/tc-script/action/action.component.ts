import { Component, OnInit, Input } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IAction, ITestCase, Control, IControl } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { TestService } from 'src/app/services/crud/test.service';
import { SettingsService } from '../settings/settings.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraganddropService } from '../draganddrop.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: IAction;
  @Input('readonly') readonly: boolean;
  @Input('showContent') showControlList: boolean;
  showActionAddButtons: boolean;
  testcase: ITestCase;
  DragAndAdropAreaId: string;
  private DragAndDropControlIDList: Array<string>;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService,
    private SettingsService: SettingsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
    this.showActionAddButtons = false;
    this.DragAndAdropAreaId = this.generateID();
    this.DragAndDropService.observableControlsIdList.subscribe(r => { this.DragAndDropControlIDList = r; });
    // @ts-ignore
    if (this.action.controlList.length == 0) { this.showControlList = false; } else { this.showControlList = true; }
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  addControl() {
    var newControl = new Control(
      this.testcase.info.test,
      this.testcase.info.testCase,
      this.action.step,
      this.action.controlList.length,
      this.action.controlList.length + 1,
      this.action.sequence
    )
  }

  focusOnAction(): void {
    // send the action to the settings service and thus, to the settings component
    this.SettingsService.editActionSettings(this.action, this.readonly);
  }

  dropControl(event: CdkDragDrop<IControl[]>) {
    moveItemInArray(this.action.controlList, event.previousIndex, event.currentIndex);
    // todo: update the array sequence
    /*
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    */
  }

  generateID() {
    var id = 'cdk-drop-list-' + this.DragAndDropService.getID();
    this.DragAndDropService.addIDToControlList(id);
    return id;
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasActionCrossReference(action); }
  findActionCrossReference(action: string): CrossReference { return this.CrossReferenceService.findActionCrossReference(action); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasControlCrossReference(control); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findControlCrossReference(control); }

}
