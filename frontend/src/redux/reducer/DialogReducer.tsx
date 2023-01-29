import {State} from "../store";

export interface DialogAction {
    type: DialogActionType,
    payload: OpenDialogPayload | CloseDialogPayload
}

export enum DialogActionType {
    NO_DIALOG = "NO_DIALOG",
    OPEN_DIALOG = "OPEN_DIALOG",
    CLOSE_DIALOG = "CLOSE_DIALOG",
}

export interface OpenDialogPayload {
    dialogType: DialogType
}

export enum DialogType {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN'
}

export interface CloseDialogPayload {
}

export function dialogReducer(state: State, action: DialogAction): State {
    const payload: any = action.payload;
    switch (action.type) {
        case (DialogActionType.OPEN_DIALOG): {
            return {
                ...state,
                openedDialogName: payload.dialogType
            }
        }
        case (DialogActionType.CLOSE_DIALOG): {
            return {
                ...state,
                openedDialogName: DialogActionType.NO_DIALOG
            }
        }
        default:
            return state
    }
}

export function openDialogAC(dialogType: DialogActionType): DialogAction {
    return {
        type: DialogActionType.OPEN_DIALOG,
        payload: {
            dialogType
        }
    }
}

export function closeDialogAC(): DialogAction {
    return {
        type: DialogActionType.CLOSE_DIALOG,
        payload: {}
    }
}