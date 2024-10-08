/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateOrderDto {
  orderDate?: string | null;
  deliveryDate?: string | null;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: CreateOrderEntryDto[] | null;
}

export interface CreateOrderEntryDto {
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  orderId?: number;
}

export interface CreatePaperDto {
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
}

export interface Customer {
  /** @format int32 */
  id?: number;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  orders?: Order[] | null;
}

export interface CustomerDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface Order {
  /** @format int32 */
  id?: number;
  orderDate?: string | null;
  deliveryDate?: string | null;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  customer?: Customer;
  orderEntries?: OrderEntry[] | null;
}

export interface OrderDto {
  /** @format int32 */
  id?: number;
  orderDate?: string | null;
  deliveryDate?: string | null;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  order?: Order;
  product?: Paper;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  orderEntries?: OrderEntry[] | null;
  properties?: Property[] | null;
}

export interface PaperDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  properties?: string[] | null;
}

export interface Property {
  /** @format int32 */
  id?: number;
  propertyName?: string | null;
  papers?: Paper[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customers
     * @name getAllCustomers
     * @request GET:/api/Customers
     */
    getAllCustomers: (params: RequestParams = {}) =>
      this.request<CustomerDto[], any>({
        path: `/api/Customers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name getAllOrders
     * @request GET:/api/Orders
     */
    getAllOrders: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCreate
     * @request POST:/api/Orders
     */
    ordersCreate: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersUpdate
     * @request PUT:/api/Orders/Update/{id}
     */
    ordersUpdate: (id: number, data: OrderDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Orders/Update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name getAllPapers
     * @request GET:/api/Papers/GetAllPapers
     */
    getAllPapers: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Papers/GetAllPapers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name getPaperDetail
     * @request GET:/api/Papers/GetPaper/{id}
     */
   getPaperDetail: (id: number, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Papers/GetPaper/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name PapersCreate
     * @request POST:/api/Papers/Create
     */
    papersCreate: (data: CreatePaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Papers/Create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name papersUpdate
     * @request PUT:/api/Papers/Update/{id}
     */
    papersUpdate: (id: number, data: PaperDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Papers/Update/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name papersDelete
     * @request DELETE:/api/Papers/Delete/{id}
     */
    papersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Papers/Delete/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name PapersSortByPriceList
     * @request GET:/api/Papers/SortByPrice
     */
    papersSortByPriceList: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Papers/SortByPrice`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name PapersSortByStockList
     * @request GET:/api/Papers/SortByStock
     */
    papersSortByStockList: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Papers/SortByStock`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name PapersSortByDiscountList
     * @request GET:/api/Papers/SortByDiscount
     */
    papersSortByDiscountList: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Papers/SortByDiscount`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name PapersSearch
     * @request GET:/api/Papers/Search
     */
    papersSearch: (
      query?: {
        name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaperDto[], any>({
        path: `/api/Papers/Search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
