import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

export default class GenericRestService {
    protected service : AxiosInstance;

    constructor(baseURL: string)
    {
        this.service = Axios.create({baseURL});
    }

    public get<T>(ruta: string, parametros?: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
          this.service
            .get(`${ruta}${parametros ? `/${parametros}` : ''}`, config)
            .then((respuesta) => {
              resolve(respuesta);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      public post<T, U>(ruta: string, body: U, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
          this.service
            .post(`${ruta}`, body, config)
            .then((respuesta) => {
              resolve(respuesta);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      public put<T, U>(ruta: string, body: U, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
          this.service
            .put(`${ruta}`, body, config)
            .then((respuesta) => {
              resolve(respuesta);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      public delete<T>(ruta: string, parametros?: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
          this.service
            .delete(`${ruta}${parametros ? `/${parametros}` : ''}`, config)
            .then((respuesta) => {
              resolve(respuesta);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      public patch<T, U>(ruta: string, body: U, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
          this.service
            .patch(`${ruta}`, body, config)
            .then((respuesta) => {
              resolve(respuesta);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

}