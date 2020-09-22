import http from "../httpService";

class DashboardService {
  public async get(): Promise<any> {
    let result = await http.get("/api/dashboard/get");
    return result.data.result;
  }
}

export default new DashboardService();
