"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.authControllers.loginUser);
exports.authRoutes = router;
//# sourceMappingURL=auth.route.js.map