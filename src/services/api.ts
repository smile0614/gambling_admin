import { toast } from "react-toastify";

import { getMockResponse } from "./mock/mockData";

/**
 * ---------------------------------------------------------------------------
 *  DEMO MODE — backend disconnected.
 * ---------------------------------------------------------------------------
 *  All network calls are intercepted here and served from the local mock
 *  layer (`./mock/mockData`) instead of hitting a real API. This lets the
 *  admin panel be demoed to a client without a running backend.
 *
 *  To restore real API behaviour, reinstate the axios-based implementation
 *  (see git history) — the rest of the app does not need to change.
 * ---------------------------------------------------------------------------
 */

// Simulated network latency so loaders/spinners behave naturally in the demo.
const MOCK_LATENCY_MS = 250;

class Api {
  static error: any = {};

  static get(
    route: string,
    data: any = {},
    params: any = {},
    options: any = {},
  ) {
    return this.xhr(route, data, params, "get", options);
  }

  static put(
    route: string,
    data: any = {},
    params: any = {},
    options: any = {},
  ) {
    return this.xhr(route, data, params, "put", options);
  }

  static post(
    route: string,
    data: any = {},
    params: any = {},
    options: any = {},
  ) {
    return this.xhr(route, data, params, "post", options);
  }

  static delete(route: string, data: any = {}, params: any = {}) {
    return this.xhr(route, data, params, "delete");
  }

  static replaceVariables(route: string, params: any) {
    Object.keys(params).forEach((key) => {
      route = route.replace(`:${key}`, params[key]);
    });
    return route;
  }

  static xhr(
    route: string,
    data: any = {},
    params: any = {},
    method: string,
    _defaultOptions: any = {},
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const result = getMockResponse(route, method, data, params);

        // Preserve the original success/error toast behaviour for actions
        // that return a `{ success, message }` envelope.
        if (result && typeof result === "object" && !Array.isArray(result)) {
          const { success, message } = result as any;
          if (success !== undefined && message) {
            toast(message, { type: success ? "success" : "error" });
          }
        }

        resolve(result);
      }, MOCK_LATENCY_MS);
    });
  }

  static uploadFile(
    route: string,
    data: any = {},
    params: any = {},
    _file: File,
    _defaultOptions: any = {},
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const result = getMockResponse(route, "post", data, params);
        if (result && typeof result === "object" && !Array.isArray(result)) {
          const { success, message } = result as any;
          if (success !== undefined && message) {
            toast(message, { type: success ? "success" : "error" });
          }
        }
        resolve(result);
      }, MOCK_LATENCY_MS);
    });
  }
}

export default Api;
