import { ResponseApi } from "../model/resposeApi.js";

export const businessException = (statusCode,message) => {
    const responseApi = new ResponseApi({});
    responseApi.statusCode = statusCode;
    responseApi.data = null;
    responseApi.resultIndicator = 0;
    responseApi.resultMessage = message;
    return responseApi;
};