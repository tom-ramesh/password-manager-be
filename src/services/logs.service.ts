import { addLogModel, ILogInput } from "../models/logs.model.js";

export async function addLogService(logData: ILogInput) {
  try {
    const result = await addLogModel(logData);
    return { success: true, data: result, error: null };
  } catch (error) {
    throw error;
  }
}
