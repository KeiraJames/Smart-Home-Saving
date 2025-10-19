import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// --- PASTE YOUR FIREBASE CONFIG OBJECT HERE ---
const firebaseConfig = {
  "type": "service_account",
  "project_id": "smart-home-savings",
  "private_key_id": "d6b9a77aa4e0fea0a31e0a535bdaa8e615779f5b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCp28z8rikRPn2a\nUfqA+HA3FQpNltMvZWzd7xBL585bkeJ2zBGZanbTpN7Kt4SpbsDZ5HlKBtdNb58o\nT6UQ13D8g+DXRdKHH2GXEJXgyQhFNQCiHT41eZY1mQaG/uGrXwHoEKK/LEqYL0Eo\nmOTa4wFbGiGRGRavI3IOMFAsAUEAm4cqkj6yhVyEebyYzM+dOr2HY5E8Pf4huNmb\nfKH28jlLoebT2JOC16GZhQ3AdUsAr+ahTHaifg7muQo1rU6BFusv4SFpvuz/fYcP\n8m2O+KF0djEUjllAFA9dikWiNwcLmhgJxiuDNzISFH5Bhc3e9JrsimQLr6aW2imr\noxkaGK53AgMBAAECggEAS02pSqpxhXYVXBmU+6FoqlrXFv/TP3NxOND4AhbSCxGZ\nez5MXR3wcTLqHKgQlccGk3LxfKqcv/VI86efj+BbdG+I+hc31vTIIJ9XOvEVDA2L\n6tMZFb8CI1/kn2uXI5D6uOXLKQLbTS3B7twdtZanLrref8PGJT4LHhQ4LtIdfcU8\nefLtnv1YrL7sLQ5S/qgofwQ25n9sYnGscKkE/MqvbOPXAtTR1zEOHojtWXd+alFT\n5/+cxzj6KPb8gyZ3Y/FR8uJNu++AW3NDwKvB3mC2A9u/+JWCdvO5cCZZkRYorEO6\nqbFZVnFHfFRNGcgI1Nc9qlADOJLY0P0vknwtMtIf5QKBgQDeNJasANRAN1tlgrOk\n4ppg6loOi3X/kOwOWA21A4mwSUYvS3hiIXgJlNyPcmU+60udkrVhOyZoQpAN/QEW\ngzNwMN+JwwgqXb3HlLmhHgHU76M+Toc2aYCgxo5JYUt6N4KMnQhnHiBgO1TPpkI2\njRxn/BrSkUsAEtBpvxPQswAsKwKBgQDDsSAYGAKbUNg/yAYXMNMzNpkpbbaW2QhC\nuYuk0i0QMRXQxTjHlzWvkt0EVbZID9fSiXf16z7hOM0EFGFa/68nGIDL0Jc0ldS+\nLGg6XvC+BQotZ1F8zbOX3JtE6y/UMa7+XYUm0f8vSsUUVV+vHpBPTAnAjN1pNKe1\nd+CiKAGE5QKBgBA/WCULinmHkq9Bd1E/IHqlqCAYInClcB08YwQxVggF05PxuMO0\nHsrUj6wNeUm4erby20BYyt4kv9PGBCZZQZGagT3ZfOdcI1xMi6Y0Q34GZ7FOnKRl\n4nnfCthivNoa5PjTIqInmcZvkCv+xCio+MLBtFRhO1KuDX8t8Yz5CbIxAoGAf6jP\n+AfJw4qU197j4kMOtC0c84LIB1Yj5mtmZqpZjWOICL5wEPxaoGPdXNORaycysvzM\nzhed2I0WaV/mNtfvakC43L0BtuM7eqg7gkCnKj7dacspxJHoY9wdSnNmqzWSJAvc\nLfv2TeKn+GDNX88/cwt2nS8HzXb1JRPD7eTNQOUCgYAhtCeH6N3b8uTb4hYJBfuA\nVlYIUNxlQPaMk5tLRI6zJ4cJAo/vtulYIO2/SVXjO7R64vLSeswTXe3NjhkuNKrU\noHvBCMtQITwsFxm3Oy333Wu/EzXA5x6YodefjWHm8wFAnVhju9+vx+o6D0+OBHT6\nbOFw60Bq/Tjbl/PDx9cLmg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@smart-home-savings.iam.gserviceaccount.com",
  "client_id": "113719478035705895967",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40smart-home-savings.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
;
// ---------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance so your components can use it
export const db = getDatabase(app);