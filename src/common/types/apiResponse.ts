export interface IApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  errors?: string;
}
