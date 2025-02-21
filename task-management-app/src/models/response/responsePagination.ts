import IGenericResponse from "./genericResponse";

export default interface IResponsePagination<T> extends IGenericResponse<T>{
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    //http://localhost:5110/api/Project/GetAllPagination/1/5
}

// Data prueba
// {
//     "pageNumber": 1,
//     "totalPages": 4,
//     "totalCount": 20,
//     "hasPreviousPage": false,
//     "hasNextPage": true,
//     "data": [
//       {
//         "id": "0acde44e-9744-4d1f-8f77-02adf2ef0210",
//         "name": "Cafesalud",
//         "description": "Eps",
//         "assignedTo": null,
//         "createdBy": "00000000-0000-0000-0000-000000000000"
//       },
//       {
//         "id": "59c2990b-f7ea-4515-af69-0b60f1191913",
//         "name": "Alpina",
//         "description": "Alimentos",
//         "assignedTo": null,
//         "createdBy": "00000000-0000-0000-0000-000000000000"
//       },
//       {
//         "id": "2cab9c8b-da57-4d85-b878-1ea2b70194b8",
//         "name": "Tecnocenter",
//         "description": "Tecnologia",
//         "assignedTo": null,
//         "createdBy": "00000000-0000-0000-0000-000000000000"
//       },
//       {
//         "id": "f0acaeae-5d33-4a8d-8d7a-212b1ed9ddc6",
//         "name": "Consorcio",
//         "description": "Proyecto de cajas de compensacion",
//         "assignedTo": null,
//         "createdBy": "00000000-0000-0000-0000-000000000000"
//       },
//       {
//         "id": "0516fc91-792e-440e-ac84-239332c29a8b",
//         "name": "Sanitas",
//         "description": "Eps",
//         "assignedTo": null,
//         "createdBy": "00000000-0000-0000-0000-000000000000"
//       }
//     ],
//     "isSuccess": true,
//     "message": "Consulta paginada exitosa",
//     "errors": null
//   }