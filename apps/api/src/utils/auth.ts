// utils/auth.ts
import { createDb } from "@/db";
import type { Environment } from "@/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createAuth = (env: Environment) => {
  const db = createDb(env);

  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.HONO_APP_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustHost: true,
    basePath: "/api/auth",

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${env.HONO_APP_URL}/api/auth/callback/google`,
      },
    },

    trustedOrigins: [env.VITE_APP_URL, "http://localhost:3000"],

    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
      },
    },

    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    advanced: {
      useSecureCookies: true,
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        path: "/",
        domain: undefined,
      },
    },
  });
};

// import { createDb } from "@/db";
// import type { Environment } from "@/env";
// import { betterAuth } from "better-auth";
// import { openAPI } from "better-auth/plugins";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";

// export const createAuth = (env: Environment) => {
//   const db = createDb(env);
//   return betterAuth({
//     database: drizzleAdapter(db, { provider: "pg" }),
//     baseURL: env.HONO_APP_URL,
//     secret: env.BETTER_AUTH_SECRET,
//     trustHost: true,
//     basePath: "/api/auth",

//     socialProviders: {
//       google: {
//         clientId: env.GOOGLE_CLIENT_ID,
//         clientSecret: env.GOOGLE_CLIENT_SECRET,
//         redirectURI: `${env.HONO_APP_URL}/api/auth/callback/google`,
//         // Let Better Auth construct this automatically using baseURL
//       },
//     },

//     trustedOrigins: [env.VITE_APP_URL],

//     // Strategy "cookie" is good for cross-domain
//     plugins: [openAPI()],
//     account: {
//       storeStateStrategy: "database",
//     },
//     useSecureCookies: true,
//     advanced: {
//       defaultCookieAttributes: {
//         sameSite: "none",
//         secure: true,
//         partitioned: true,
//         httpOnly: true,
//         domain: undefined,
//       },
//     },
//   });
// };

// // import { betterAuth } from "better-auth";
// // import { drizzleAdapter } from "better-auth/adapters/drizzle";
// // import { createDb } from "@/db";
// // import { openAPI } from "better-auth/plugins";
// // import { Environment } from "@/env";

// // export const createAuth = (env: Environment) => {
// //   const db = createDb(env); // create db per request
// //   return betterAuth({
// //     socialProviders: {
// //       google: {
// //         clientId: env.GOOGLE_CLIENT_ID!,
// //         clientSecret: env.GOOGLE_CLIENT_SECRET!,
// //         redirectURI: `${env.HONO_APP_URL}/api/auth/callback/google`,
// //       },
// //     },
// //     trustHost: true,
// //     basePath: "/api/auth",
// //     baseURL: env.HONO_APP_URL,
// //     trustedOrigins: [env.VITE_APP_URL],
// //     account: {
// //       storeStateStrategy: "database",
// //     },
// //     database: drizzleAdapter(db, {
// //       provider: "pg",
// //     }),
// //     plugins: [openAPI()],
// //     advanced: {
// //       defaultCookieAttributes: {
// //         sameSite: "none",
// //         secure: true,
// //         httpOnly: true,
// //         domain: ".venkateshsundarasan.workers.dev",
// //       },
// //     },
// //   });
// // };
