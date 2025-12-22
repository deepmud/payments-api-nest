import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class ReconciliationService {
  @Cron('0 2 * * *')
  async reconcile() {
    // fetch provider report
    // compare with DB
    console.log('Running reconciliation');
  }
}
