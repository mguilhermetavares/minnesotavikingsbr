import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  // Não tenta conectar durante o build se as credenciais não estiverem configuradas
  perspective: "published",
});
