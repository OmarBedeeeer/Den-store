import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { VendorModule } from './vendors/vendor.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DBCONNECTION'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductModule,
    VendorModule,
    CartModule,
  ],
  providers: [AppService],
})
export class AppModule {}
