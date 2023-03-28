"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const permission_module_1 = require("./permission/permission.module");
const cinemas_module_1 = require("./cinemas/cinemas.module");
const data_module_1 = require("./data/data.module");
const movies_module_1 = require("./movies/movies.module");
const order_module_1 = require("./orders/order.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.use(express.static('.'));
    const options = {
        include: [
            auth_module_1.AuthModule,
            users_module_1.UserModule,
            admin_module_1.AdminModule,
            permission_module_1.PermissionModule,
            cinemas_module_1.CinemasModule,
            data_module_1.DataModule,
            movies_module_1.MoviesModule,
            order_module_1.OrderModule,
        ],
        deepScanRoutes: true,
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Capstone Nodejs API')
        .setDescription('Capstone Nodejs API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('/swagger', app, document);
    await app.listen(process.env.PORT);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map