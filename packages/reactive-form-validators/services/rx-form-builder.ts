import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup, FormArray, Validators,FormControl } from "@angular/forms"
import { Type, DecoratorName } from "../util"
import {BaseFormBuilder } from './base-form-builder';


import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from '../core/validator.interface';

import { FormBuilderConfiguration } from "../models"
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY , FUNCTION_STRING,OBJECT_STRING,RX_WEB_VALIDATOR,NUMBER,BOOLEAN,STRING} from "../const"
import { PropValidationConfig } from "../models/prop-validation-config";

import { AnnotationTypes } from "../core/validator.static";
import { conditionalChangeValidator } from "../reactive-form-validators/conditional-change.validator";
import { Linq } from '../util/linq'
import { APP_VALIDATORS } from '../const/app-validators.const'
import {RxFormControl } from './form-control';
import { RxFormGroup } from './rx-form-group'
import { RxFormArray } from './rx-form-array';


@Injectable()
export class RxFormBuilder extends BaseFormBuilder {
    private nestedProp: string;
    private conditionalObjectProps: any[] = [];
    private conditionalValidationInstance: any = {};
    private builderConfigurationConditionalObjectProps: any[] = [];
    private formGroupPropOtherValidator :{[key:string]:any} = {};
    private currentFormGroupPropOtherValidator :{[key:string]:any} = {};
    private isNested: boolean = false;
    private isGroupCalled:boolean = false;
    constructor() {
      super()
    }

    

    private getInstanceContainer(instanceFunc: any): InstanceContainer {
        return defaultContainer.get(instanceFunc);
    }

    private setValue(formGroup: FormGroup, object: any): void {
        for (var col in object) {
            var control = formGroup.get([col]);
            control.setValue(object[col]);
            control.updateValueAndValidity();
        }
    }

    private extractExpressions(fomrBuilderConfiguration: FormBuilderConfiguration): { [key: string]: string[] } {
        if (fomrBuilderConfiguration && fomrBuilderConfiguration.dynamicValidation) {
            for (var property in fomrBuilderConfiguration.dynamicValidation) {
                for (var decorator in fomrBuilderConfiguration.dynamicValidation[property]) {
                    if (fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression) {
                        let columns = Linq.expressionColumns(fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression);
                        defaultContainer.addChangeValidation(this.conditionalValidationInstance, property, columns);
                    }
                }
            }
        }
        return null;
    }

    private addFormControl(property: PropertyInfo, propertyValidators: DecoratorConfiguration[], propValidationConfig: PropValidationConfig, instance: InstanceContainer,entity:any) {
        let validators = [];
        let columns = [];
        if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]) || (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])) {
            let props = [];
            if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]))
                instance.conditionalValidationProps[property.name].forEach(t => props.push(t))
            if (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])
                this.conditionalValidationInstance.conditionalValidationProps[property.name].forEach(t => props.push(t));
            validators.push(conditionalChangeValidator(props));
        }
        if (this.conditionalObjectProps.length > 0 || this.builderConfigurationConditionalObjectProps.length > 0) {
            let propConditions = [];
            if (this.conditionalObjectProps)
                propConditions = this.conditionalObjectProps.filter(t => t.propName == property.name);
            if (this.builderConfigurationConditionalObjectProps)
                this.builderConfigurationConditionalObjectProps.filter(t => t.propName == property.name).forEach(t => propConditions.push(t));
            propConditions.forEach(t => {
                if (t.referencePropName && columns.indexOf(t.referencePropName) == -1)
                    columns.push(t.referencePropName);
            })
            if (columns.length > 0)
                validators.push(conditionalChangeValidator(columns));
        }
        for (let propertyValidator of propertyValidators) {
            propertyValidator.annotationType == AnnotationTypes.rule ? validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config, entity)) : validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config))
        }
        if (propValidationConfig)
            this.additionalValidation(validators, propValidationConfig);
        if(this.currentFormGroupPropOtherValidator[property.name]) 
            this.currentFormGroupPropOtherValidator[property.name].forEach(t=> { validators.push(t); })
        return validators;
    }

    private additionalValidation(validations: any[], propValidationConfig: PropValidationConfig) {
        for (var col in AnnotationTypes) {
            if (propValidationConfig[AnnotationTypes[col]] && col != "custom") {
                validations.push(APP_VALIDATORS[AnnotationTypes[col]](propValidationConfig[AnnotationTypes[col]]));
            }
            else if (col == AnnotationTypes.custom && propValidationConfig[AnnotationTypes[col]])
                validations.push(propValidationConfig[col]);
        }
    }

    private checkObjectPropAdditionalValidation<T>(instanceContainer: InstanceContainer, object: T) {
        var props = instanceContainer.properties.filter(t => t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY)
        props.forEach(t => {
            let instance = this.getInstanceContainer(t.entity);
            if (instance.conditionalValidationProps) {
                for (var key in instance.conditionalValidationProps) {
                    var prop = instanceContainer.properties.filter(t => t.name == key)[0];
                    if (prop) {
                        if (!instanceContainer.conditionalValidationProps)
                            instanceContainer.conditionalValidationProps = {};
                            if (!instanceContainer.conditionalValidationProps[key])
                                instanceContainer.conditionalValidationProps[key] = [];
                        instance.conditionalValidationProps[key].forEach(x => {
                            if (t.propertyType != ARRAY_PROPERTY)
                                instanceContainer.conditionalValidationProps[key].push([t.name, x].join('.'))
                            else
                                instanceContainer.conditionalValidationProps[key].push([t.name, x].join('[]'))
                        })
                    }
                }
            }
        })
    }

    private getObject(model: any | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): {[key:string]:any} {
        let json: { [key: string]: any } = {};

        if (typeof model == FUNCTION_STRING)
            json.model = model;

        if (typeof model == FUNCTION_STRING && (entityObject instanceof FormBuilderConfiguration)){
            json.entityObject = this.createClassObject(json.model,entityObject) 
        }
        if (entityObject && !(entityObject instanceof FormBuilderConfiguration))
            json.entityObject = entityObject;

        if (entityObject instanceof FormBuilderConfiguration && !formBuilderConfiguration)
            json.formBuilderConfiguration = entityObject;
        else if (!(entityObject instanceof FormBuilderConfiguration) && formBuilderConfiguration){
            json.formBuilderConfiguration = formBuilderConfiguration;
            json.entityObject = this.createClassObject(json.model,json.formBuilderConfiguration,json.entityObject)
        }
            
        
        if (!entityObject) {
            if (typeof model == OBJECT_STRING)
                json.model = model.constructor;
            json.entityObject = this.createClassObject(json.model,json.formBuilderConfiguration,model)
        } else if (model && (entityObject instanceof FormBuilderConfiguration) && (typeof model == OBJECT_STRING)) {
            json["model"] = model.constructor;
            json["entityObject"] = this.createClassObject(json.model,json.formBuilderConfiguration,model)
        }
        return json;
    }

    


    group(groupObject:{[key:string]:any}, validatorConfig?:FormBuilderConfiguration) : FormGroup {
        let modelInstance = super.createInstance();
        let entityObject = {};
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.createValidatorFormGroup(groupObject,entityObject,modelInstance,validatorConfig);
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.isGroupCalled = true;
        let formGroup = this.formGroup(modelInstance.constructor,entityObject,validatorConfig);
        this.isGroupCalled = false  ;
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.formGroupPropOtherValidator = {};
        return formGroup;
    }

    private applyAllPropValidator(propName:string,validatorConfig:FormBuilderConfiguration,modelInstance:any){
        if(validatorConfig && validatorConfig.applyAllProps)
        {
            if(!(validatorConfig.excludeProps && validatorConfig.excludeProps.length > 0 && validatorConfig.excludeProps.indexOf(propName) == -1)){
              validatorConfig.applyAllProps.forEach((t:any)=>{
                      if(t.name == RX_WEB_VALIDATOR){
                        t(propName,modelInstance)
                      }else{
                        if(!this.currentFormGroupPropOtherValidator[propName])
                            this.currentFormGroupPropOtherValidator[propName] = [];
                        this.currentFormGroupPropOtherValidator[propName].push(t)
                     }
              })
            } 
        }
    }

    private dynamicValidationPropCheck(propName:string, validatorConfig:FormBuilderConfiguration){
        return (validatorConfig == undefined) ? true : (!validatorConfig.dynamicValidationConfigurationPropertyName) ? true : validatorConfig.dynamicValidationConfigurationPropertyName == propName ? false : true; 
    }

    private createValidatorFormGroup(groupObject:{[key:string]:any},entityObject:{[key:string]:any},modelInstance:any,validatorConfig:FormBuilderConfiguration){
          for(var propName in groupObject){
        
            var prop = groupObject[propName];
            if (prop instanceof Array && prop.length > 0 && typeof prop[0] != OBJECT_STRING) {
              let propValidators = (prop.length > 1 && prop[1] instanceof Array) ? prop[1] : (prop.length == 2) ? [prop[1]] : [];
              let propertyAdded: boolean = false;
              for (var i = 0; i < propValidators.length; i++) {
                if (propValidators[i].name == RX_WEB_VALIDATOR) {
                  propValidators[i](propName, modelInstance);
                  propertyAdded = true;
                }
                else {
                  if (!this.currentFormGroupPropOtherValidator[propName])
                    this.currentFormGroupPropOtherValidator[propName] = [];
                  this.currentFormGroupPropOtherValidator[propName].push(propValidators[i])
                }
              }
              if (!propertyAdded)
                defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
              this.applyAllPropValidator(propName, validatorConfig, modelInstance)
            } else if (typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN) {
              defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
              this.applyAllPropValidator(propName, validatorConfig, modelInstance)
            } else if (prop instanceof Array) {
                if(prop instanceof FormArray){
                  entityObject[propName] = prop;
                } else {
                let propModelInstance = super.createInstance();
                if(typeof modelInstance == "function")
                    modelInstance.constructor = modelInstance;
                defaultContainer.initPropertyObject(propName,ARRAY_PROPERTY,propModelInstance.constructor,modelInstance);
                entityObject[propName] = [];
                for(let row of prop){
                let jObject = {};
                entityObject[propName].push(jObject)
                this.createValidatorFormGroup(row,jObject,propModelInstance.constructor,validatorConfig);
                }

                }

            }else if (typeof prop == OBJECT_STRING && !(prop instanceof FormControl || prop instanceof RxFormControl)){
 
              let formGroup: any = (prop instanceof FormArray) ? prop.controls[0] : prop
              if (!formGroup.model && (prop instanceof FormGroup || prop instanceof RxFormGroup )) {
                formGroup = this.group(formGroup.controls);
              }
                if(prop instanceof FormGroup  || prop instanceof RxFormGroup ){
                  entityObject[propName] = prop;
                  defaultContainer.initPropertyObject(propName,OBJECT_PROPERTY,formGroup.model,modelInstance);
                }else if (prop instanceof FormArray){
                  entityObject[propName] = prop;
                  defaultContainer.initPropertyObject(propName,ARRAY_PROPERTY,formGroup.model,modelInstance);
                }else{
                if(this.dynamicValidationPropCheck(propName,validatorConfig)){
                this.formGroupPropOtherValidator[propName] = {};
                this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[propName];
                let propModelInstance = super.createInstance();
                entityObject[propName] = {};
                entityObject[propName].constructor= propModelInstance.constructor;
                defaultContainer.initPropertyObject(propName,OBJECT_PROPERTY,entityObject[propName].constructor,modelInstance);
                let objectValidationConfig = this.getValidatorConfig(validatorConfig,groupObject, propName+".")
                this.createValidatorFormGroup(groupObject[propName],entityObject[propName],entityObject[propName].constructor,objectValidationConfig);
                }else entityObject[propName] = groupObject[propName];
                }

            }
          if (typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN) {
              entityObject[propName] = prop
            }
          else if((prop && prop.length > 0 && ( typeof prop[0] != OBJECT_STRING) && !(prop instanceof FormControl  || prop instanceof RxFormControl) && !(prop instanceof FormArray))) {
            entityObject[propName] = prop[0]
          }else if(prop instanceof FormArray){
              entityObject[propName] = prop    
          } else if(prop instanceof FormControl || prop instanceof RxFormControl){
            entityObject[propName] = prop
              defaultContainer.initPropertyObject(propName,PROPERTY,undefined, modelInstance.constructor ? modelInstance : {constructor:modelInstance});
        }
     }        
   }

   private getValidatorConfig(validatorConfig:FormBuilderConfiguration,entityObject:any,rootPropertyName:string,arrayPropertyName?:string) : any {
      let validationProps = {};
      let excludeProps = [];
      let includeProps = [];
      if(validatorConfig){
        for (var propName in validatorConfig.dynamicValidation) {
          if (propName.indexOf(rootPropertyName) != -1 || (arrayPropertyName && propName.indexOf(arrayPropertyName) != -1)) {
              let splitProp = propName.split(".")[1];
              if(splitProp )
              validationProps[splitProp] = validatorConfig.dynamicValidation[propName]
        }
      }
      if(validatorConfig.excludeProps)
        excludeProps = this.getProps(validatorConfig.excludeProps,rootPropertyName);

      if(validatorConfig.includeProps)
        includeProps = this.getProps(validatorConfig.includeProps,rootPropertyName);


      return {includeProps:includeProps,dynamicValidation: (validatorConfig.dynamicValidationConfigurationPropertyName && entityObject[validatorConfig.dynamicValidationConfigurationPropertyName]) ? entityObject[validatorConfig.dynamicValidationConfigurationPropertyName] : validationProps,excludeProps:excludeProps}
    }
    return {}
      
    }

    private getProps(properties:string[],rootPropertyName:string){
      let props:string[] = [];
        for(let prop of properties){
              if(prop.indexOf(rootPropertyName) != -1) {
                  let splitProp = prop.split(".")[1];
                  if(splitProp)
                    props.push(splitProp);
              } 
          }
      return props;
    }

    formGroup<T>(model: Type<T> | { [key: string]: any }, entityObject?: { [key: string]: any } | FormBuilderConfiguration, formBuilderConfiguration?: FormBuilderConfiguration): RxFormGroup | FormGroup{
        let json = this.getObject(model, entityObject, formBuilderConfiguration);
        model = json.model;
        entityObject = json.entityObject;
        if(entityObject.constructor != model && !this.isGroupCalled){
        entityObject = json.entityObject = this.updateObject(model,json.entityObject);
        }
        formBuilderConfiguration = json.formBuilderConfiguration;
        if (formBuilderConfiguration)
            this.extractExpressions(formBuilderConfiguration);
        let instanceContainer: InstanceContainer = this.getInstanceContainer(model);
        this.checkObjectPropAdditionalValidation(instanceContainer, entityObject);
        let formGroupObject = {};
        let formChildGroup = undefined;
        let formArrayGroup = undefined;
        var additionalValidations: { [key: string]: PropValidationConfig } = {};
        instanceContainer.properties.forEach(property => {
            let isIncludeProp = true;
            if (formBuilderConfiguration && formBuilderConfiguration.excludeProps && formBuilderConfiguration.excludeProps.length > 0)
                isIncludeProp = formBuilderConfiguration.excludeProps.indexOf(property.name) == -1
            if (formBuilderConfiguration && formBuilderConfiguration.dynamicValidation)
                additionalValidations = formBuilderConfiguration.dynamicValidation;
            if (formBuilderConfiguration && formBuilderConfiguration.includeProps && formBuilderConfiguration.includeProps.length > 0)
                isIncludeProp = formBuilderConfiguration.includeProps.indexOf(property.name) != -1
            if (isIncludeProp) {
                switch (property.propertyType) {
                    case PROPERTY:
                        if(!(entityObject[property.name] instanceof FormControl || entityObject[property.name] instanceof RxFormControl)){
                        var propertyValidators = instanceContainer.propertyAnnotations.filter(t => t.propertyName == property.name);
                        formGroupObject[property.name] = new RxFormControl(entityObject[property.name],this.addFormControl(property, propertyValidators, additionalValidations[property.name], instanceContainer,entityObject),undefined,json.entityObject,Object.assign({}, json.entityObject),property.name);
                        this.isNested = false;
                       }else
                        formGroupObject[property.name] = entityObject[property.name]
                    break;
                    case OBJECT_PROPERTY:
                        if (entityObject[property.name] && entityObject[property.name] instanceof Object && !(entityObject[property.name] instanceof FormGroup || entityObject[property.name] instanceof RxFormGroup)) {
                            this.isNested = true;
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name)
                            if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name);
                            if(this.formGroupPropOtherValidator[property.name])
                              this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[property.name];
                            let objectValidationConfig = this.getValidatorConfig(formBuilderConfiguration,entityObject[property.name], `${property.name}.`)
                            formGroupObject[property.name] = this.formGroup(property.entity, entityObject[property.name], objectValidationConfig);
                            this.conditionalObjectProps = [];
                            this.builderConfigurationConditionalObjectProps = [];
                            this.isNested = false;
                        } else if (entityObject[property.name] instanceof FormGroup || entityObject[property.name] instanceof RxFormGroup)
                          formGroupObject[property.name] = entityObject[property.name];
                        break;
                    case ARRAY_PROPERTY:
                        if (entityObject[property.name] && entityObject[property.name] instanceof Array && !(entityObject[property.name] instanceof FormArray)) {
                            this.isNested = true;
                            var formArrayGroup = [];
                            let index = 0;
                            for (let subObject of entityObject[property.name]) {
                                if (instanceContainer && instanceContainer.conditionalObjectProps)
                                    this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index)
                                if (this.conditionalValidationInstance && this.conditionalValidationInstance.conditionalObjectProps)
                                    this.builderConfigurationConditionalObjectProps = this.conditionalValidationInstance.conditionalObjectProps.filter(t => t.objectPropName == property.name && t.arrayIndex == index);
                                  if(this.formGroupPropOtherValidator[property.name])
                                    this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[property.name];
                                let objectValidationConfig = this.getValidatorConfig(formBuilderConfiguration,subObject, `${property.name}.`,`${property.name}[${index}].`)
                                formArrayGroup.push(this.formGroup(property.entity, subObject, objectValidationConfig));
                                index++;
                                this.conditionalObjectProps = [];
                                this.builderConfigurationConditionalObjectProps = [];
                            }
                            let formBuilder = new FormBuilder();
                            
                            formGroupObject[property.name] = new RxFormArray(entityObject[property.name],formArrayGroup);
                            this.isNested = false;
                        }else if (entityObject[property.name] instanceof FormArray)
                            formGroupObject[property.name] = entityObject[property.name];
                        break;
                }
            }

        })
        if (!this.isNested) {
            this.conditionalValidationInstance = {};
            this.builderConfigurationConditionalObjectProps = [];
        }
        return new RxFormGroup(json.model,json.entityObject,formGroupObject,undefined)
    }
}
