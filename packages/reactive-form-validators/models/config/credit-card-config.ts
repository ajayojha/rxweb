import { BaseConfig } from './base-config'
export interface CreditCardConfig extends BaseConfig {
    creditCardTypes?: string[];
    fieldName?:string;
}
