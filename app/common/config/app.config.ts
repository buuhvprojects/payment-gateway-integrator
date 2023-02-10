const { PORT, DEV_MODE, WORKSPACE_EXPIRES_AT, ASAAS_API_DEV, ASAAS_API_PROD, ASAAS_API_KEY } = process.env;
const app = {
    PORT: PORT || 3000,
    lang: "pt-br",
    devMode: Boolean(DEV_MODE) || false,
    workspaceExpiresAt: Number(WORKSPACE_EXPIRES_AT),
    ASAAS: {
        API_DEV: ASAAS_API_DEV,
        API_PROD: ASAAS_API_PROD,
        apiKey: ASAAS_API_KEY
    }
}
export default app;
