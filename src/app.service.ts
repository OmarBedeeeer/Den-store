import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl() {
    const databaseUrl = this.configService.get<string>('DBCONNECTION');
    return databaseUrl;
  }

  getPort() {
    const port = this.configService.get<number>('PORT');
    return port;
  }
}