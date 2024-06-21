import { defineConfig } from "auth-astro";
import Keycloak from "@auth/core/providers/keycloak";

export default defineConfig({
    providers: [
        Keycloak ({
            url: 'http://localhost:8080/auth',
			realm: 'UNAHUR',
			clientId: 'front',
            issuer: "http://localhost:8080/realms/UNAHUR",
            authorization: "http://localhost:8080/realms/UNAHUR/protocol/openid-connect/auth",
            clientSecret:"2mtfRvvGaLnJcdrVMEtydoSdRU3tWjS3",
            
            
        })
        
    ]
})