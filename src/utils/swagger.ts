import { type Express, type Request, type Response } from "express";
//import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//import { version } from "../../package.json";
import * as swaggerDocument from "./api-docs.json";

/* const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
  },
  apis: ["./src/app.ts", "./src/routes/*.ts"],
  //add path: "swagger-path-definitions.json"
};

const swaggerSpec = swaggerJSDoc(options); */

function swaggerDocs(app: Express, port: string | number): void {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-type", "application/json");
    res.send(swaggerDocument);
  });

  console.log(
    `Docs available at http://localhost:${port}/docs`
  );
}

export default swaggerDocs;
