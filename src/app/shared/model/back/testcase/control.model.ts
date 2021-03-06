/**
 * @class Control
 * @classdesc control of a test case action
 */
export class Control {

    /** @description test folder of the control */
    test: string;

    /** @description test case id of the control */
    testcase: string;

    /** @description condition operator */
    conditionOperator: string;

    /** @description condition value 1 */
    conditionValue1: string;

    /** @description condition value 2 */
    conditionValue2: string;

    /** @description condition value 3 */
    conditionValue3: string;

    /** @description description od the control */
    description: string;

    /** @description control type */
    control: string;

    /** @description control value 1 */
    value1: string;

    /** @description control value 2 */
    value2: string;

    /** @description control value 3 */
    value3: string;

    /** @description is the control fatal? */
    isFatal: boolean;

    /** @description name of the screenshot file (only in execution) */
    screenshotFilename: string;

    /** @description position of the control in the action */
    sort: number;

    /** @description index of the parent step */
    stepId: number;

    /** @description id of the parent action */
    actionId: number;

    /** @description unique id of the control */
    controlId: number;

    /** @description flag for deletion */
    toDelete?: boolean;

    constructor(testfolder: string, testcaseid: string, sort: number, stepId: number, actionId: number) {
        this.toDelete = false;
        this.test = testfolder;
        this.testcase = testcaseid;
        this.stepId = stepId;
        this.actionId = actionId;
        this.control = 'Unknown';
        this.sort = sort;
        this.description = '';
        this.conditionOperator = 'always';
        this.conditionValue1 = '';
        this.conditionValue2 = '';
        this.conditionValue3 = '';
        this.value1 = '';
        this.value2 = '';
        this.value3 = '';
        this.isFatal = false;
        this.screenshotFilename = '';
    }
}
