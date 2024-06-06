import Vue from 'vue';

interface ValidateType {
    name: string;
    validForm: {
        required: {
            required: boolean;
            message: string;
        };
        requiredDate: {
            type: string;
            required: boolean;
            message: string;
        };
        requiredArray: {
            type: string;
            required: boolean;
            message: string;
        };
        numeric: {
            pattern: RegExp;
            message: string;
        };
        english: {
            pattern: RegExp;
            message: string;
        };
        format: (type: string) => {
            validator: (rule: any, value: any, callback: CallBackType) => void;
        };
        phone: {
            validator: (rule: any, value: any, callback: CallBackType) => void;
        };
        charNumber: {
            pattern: RegExp;
            message: string;
        };
        number: (errMsg: string, min?: number, max?: number, digitsmin?: number, digitsmax?: number) => {
            validator: (rule: any, value: any, callback: CallBackType) => void;
        };
    };
    isRegExp: (v: any) => boolean;
    isIp: (ip: string) => boolean;
    isDomain: (domain: string) => boolean;
    isMobilePhone: (phone: string) => boolean;
    isFixPhone: (phone: string) => boolean;
    isEmail: (email: string) => boolean;
    isUrl: (url: string) => boolean;
    isNumber: (value: number, min?: number, max?: number, digitsmin?: number, digitsmax?: number) => boolean;
    isNull: (val: any) => boolean;
    setValidData: (val: any, dafult: any) => any;
}

declare module 'vue/types/vue' {
  interface Vue {
    $validate: ValidateType
  }
}

declare const Validate: ValidateType;

export default Validate;
