// tslint:disable
/**
 * 健康助手后台
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { FoodRecordVo } from '../models';
// @ts-ignore
import { FormResult } from '../models';
// @ts-ignore
import { Result } from '../models';
/**
 * FoodRecordControllerApi - axios parameter creator
 * @export
 */
export const FoodRecordControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 根据id批量删除自定义食物计划表
         * @summary 根据id批量删除自定义食物计划表
         * @param {Array<string>} foodRecordVoIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordDelete: async (foodRecordVoIds: Array<string>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'foodRecordVoIds' is not null or undefined
            if (foodRecordVoIds === null || foodRecordVoIds === undefined) {
                throw new RequiredError('foodRecordVoIds','Required parameter foodRecordVoIds was null or undefined when calling foodRecordDelete.');
            }
            const localVarPath = `/foodRecord/`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (foodRecordVoIds) {
                localVarQueryParameter['foodRecordVoIds'] = foodRecordVoIds;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 分页查询所有食物记录
         * @summary 分页查询所有食物记录
         * @param {number} page 
         * @param {number} num 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordGet: async (page: number, num: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'page' is not null or undefined
            if (page === null || page === undefined) {
                throw new RequiredError('page','Required parameter page was null or undefined when calling foodRecordGet.');
            }
            // verify required parameter 'num' is not null or undefined
            if (num === null || num === undefined) {
                throw new RequiredError('num','Required parameter num was null or undefined when calling foodRecordGet.');
            }
            const localVarPath = `/foodRecord/`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (num !== undefined) {
                localVarQueryParameter['num'] = num;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 根据用户名称模糊分页查询所有食物记录表
         * @summary 根据用户名称模糊分页查询所有食物记录表
         * @param {string} page 
         * @param {string} num 
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPageNumGet: async (page: string, num: string, name: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'page' is not null or undefined
            if (page === null || page === undefined) {
                throw new RequiredError('page','Required parameter page was null or undefined when calling foodRecordPageNumGet.');
            }
            // verify required parameter 'num' is not null or undefined
            if (num === null || num === undefined) {
                throw new RequiredError('num','Required parameter num was null or undefined when calling foodRecordPageNumGet.');
            }
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name','Required parameter name was null or undefined when calling foodRecordPageNumGet.');
            }
            const localVarPath = `/foodRecord/{page}/{num}`
                .replace(`{${"page"}}`, encodeURIComponent(String(page)))
                .replace(`{${"num"}}`, encodeURIComponent(String(num)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 增加食物记录表(id需要为null)
         * @summary 增加食物记录表(id需要为null)
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPost: async (foodRecordVo?: FoodRecordVo, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/foodRecord/`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof foodRecordVo !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(foodRecordVo !== undefined ? foodRecordVo : {}) : (foodRecordVo || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 修改自定义食物计划表
         * @summary 修改自定义食物计划表
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPut: async (foodRecordVo?: FoodRecordVo, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/foodRecord/`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof foodRecordVo !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(foodRecordVo !== undefined ? foodRecordVo : {}) : (foodRecordVo || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FoodRecordControllerApi - functional programming interface
 * @export
 */
export const FoodRecordControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 根据id批量删除自定义食物计划表
         * @summary 根据id批量删除自定义食物计划表
         * @param {Array<string>} foodRecordVoIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async foodRecordDelete(foodRecordVoIds: Array<string>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Result>> {
            const localVarAxiosArgs = await FoodRecordControllerApiAxiosParamCreator(configuration).foodRecordDelete(foodRecordVoIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 分页查询所有食物记录
         * @summary 分页查询所有食物记录
         * @param {number} page 
         * @param {number} num 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async foodRecordGet(page: number, num: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FormResult>> {
            const localVarAxiosArgs = await FoodRecordControllerApiAxiosParamCreator(configuration).foodRecordGet(page, num, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 根据用户名称模糊分页查询所有食物记录表
         * @summary 根据用户名称模糊分页查询所有食物记录表
         * @param {string} page 
         * @param {string} num 
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async foodRecordPageNumGet(page: string, num: string, name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FormResult>> {
            const localVarAxiosArgs = await FoodRecordControllerApiAxiosParamCreator(configuration).foodRecordPageNumGet(page, num, name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 增加食物记录表(id需要为null)
         * @summary 增加食物记录表(id需要为null)
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async foodRecordPost(foodRecordVo?: FoodRecordVo, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Result>> {
            const localVarAxiosArgs = await FoodRecordControllerApiAxiosParamCreator(configuration).foodRecordPost(foodRecordVo, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 修改自定义食物计划表
         * @summary 修改自定义食物计划表
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async foodRecordPut(foodRecordVo?: FoodRecordVo, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Result>> {
            const localVarAxiosArgs = await FoodRecordControllerApiAxiosParamCreator(configuration).foodRecordPut(foodRecordVo, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * FoodRecordControllerApi - factory interface
 * @export
 */
export const FoodRecordControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 根据id批量删除自定义食物计划表
         * @summary 根据id批量删除自定义食物计划表
         * @param {Array<string>} foodRecordVoIds 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordDelete(foodRecordVoIds: Array<string>, options?: any): AxiosPromise<Result> {
            return FoodRecordControllerApiFp(configuration).foodRecordDelete(foodRecordVoIds, options).then((request) => request(axios, basePath));
        },
        /**
         * 分页查询所有食物记录
         * @summary 分页查询所有食物记录
         * @param {number} page 
         * @param {number} num 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordGet(page: number, num: number, options?: any): AxiosPromise<FormResult> {
            return FoodRecordControllerApiFp(configuration).foodRecordGet(page, num, options).then((request) => request(axios, basePath));
        },
        /**
         * 根据用户名称模糊分页查询所有食物记录表
         * @summary 根据用户名称模糊分页查询所有食物记录表
         * @param {string} page 
         * @param {string} num 
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPageNumGet(page: string, num: string, name: string, options?: any): AxiosPromise<FormResult> {
            return FoodRecordControllerApiFp(configuration).foodRecordPageNumGet(page, num, name, options).then((request) => request(axios, basePath));
        },
        /**
         * 增加食物记录表(id需要为null)
         * @summary 增加食物记录表(id需要为null)
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPost(foodRecordVo?: FoodRecordVo, options?: any): AxiosPromise<Result> {
            return FoodRecordControllerApiFp(configuration).foodRecordPost(foodRecordVo, options).then((request) => request(axios, basePath));
        },
        /**
         * 修改自定义食物计划表
         * @summary 修改自定义食物计划表
         * @param {FoodRecordVo} [foodRecordVo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        foodRecordPut(foodRecordVo?: FoodRecordVo, options?: any): AxiosPromise<Result> {
            return FoodRecordControllerApiFp(configuration).foodRecordPut(foodRecordVo, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * FoodRecordControllerApi - object-oriented interface
 * @export
 * @class FoodRecordControllerApi
 * @extends {BaseAPI}
 */
export class FoodRecordControllerApi extends BaseAPI {
    /**
     * 根据id批量删除自定义食物计划表
     * @summary 根据id批量删除自定义食物计划表
     * @param {Array<string>} foodRecordVoIds 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FoodRecordControllerApi
     */
    public foodRecordDelete(foodRecordVoIds: Array<string>, options?: any) {
        return FoodRecordControllerApiFp(this.configuration).foodRecordDelete(foodRecordVoIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 分页查询所有食物记录
     * @summary 分页查询所有食物记录
     * @param {number} page 
     * @param {number} num 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FoodRecordControllerApi
     */
    public foodRecordGet(page: number, num: number, options?: any) {
        return FoodRecordControllerApiFp(this.configuration).foodRecordGet(page, num, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 根据用户名称模糊分页查询所有食物记录表
     * @summary 根据用户名称模糊分页查询所有食物记录表
     * @param {string} page 
     * @param {string} num 
     * @param {string} name 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FoodRecordControllerApi
     */
    public foodRecordPageNumGet(page: string, num: string, name: string, options?: any) {
        return FoodRecordControllerApiFp(this.configuration).foodRecordPageNumGet(page, num, name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 增加食物记录表(id需要为null)
     * @summary 增加食物记录表(id需要为null)
     * @param {FoodRecordVo} [foodRecordVo] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FoodRecordControllerApi
     */
    public foodRecordPost(foodRecordVo?: FoodRecordVo, options?: any) {
        return FoodRecordControllerApiFp(this.configuration).foodRecordPost(foodRecordVo, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 修改自定义食物计划表
     * @summary 修改自定义食物计划表
     * @param {FoodRecordVo} [foodRecordVo] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FoodRecordControllerApi
     */
    public foodRecordPut(foodRecordVo?: FoodRecordVo, options?: any) {
        return FoodRecordControllerApiFp(this.configuration).foodRecordPut(foodRecordVo, options).then((request) => request(this.axios, this.basePath));
    }

}
