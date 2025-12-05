"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Title: CRUD operation
 * Description: Learning Express doing CRUD operation using postgres, neondb, typescritp
 * Author: Rakib Hasan
 * Date: 30/11/2025
 */
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
app_1.default.listen(env_1.config.port, () => {
    console.log(`Server is running on port ${env_1.config.port}`);
});
//# sourceMappingURL=server.js.map