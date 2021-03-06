/**
 * User Notification
 *
 * @param message: text to be displayed
 * @param style: style to apply (e.g. 'success', 'warning', 'info')
 * @param dismissable: boolean to allow the user to dismiss the notification
 * @param duration: duration (in ms) of the notification before its disappear
 *
 */
export class Notification {
    message: string;
    style: string;
    dismissable: boolean;
    duration: number;
    id: string;

    constructor(message: string, style: NotificationStyle, dismissable: boolean, duration: number, id: string) {
        this.message = message;
        this.style = style;
        this.dismissable = dismissable;
        this.duration = duration;
        this.id = id;
    }
}

// NOTIFICATION STYLE ENUM
export enum NotificationStyle {
    Info = 'alert-info',
    Success = 'alert-success',
    Warning = 'alert-warning',
    Error = 'alert-danger',
}
