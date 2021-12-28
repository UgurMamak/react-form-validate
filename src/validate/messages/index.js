import {messagesEn} from "./messages-en";
import {messagesTr} from "./messages-tr";


export const messages = (code) => {

    switch (code) {
        case 'en':
          return   messagesEn;
            break;
        case 'tr':
           return  messagesTr
            break;
        default:
          return   messagesEn;
    }
}