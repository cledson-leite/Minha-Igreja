import { MemberModel } from '../models/MemberModel';
import { Member } from '../store/useMemberStore';

export class MemberController {
  static async getAllMembers(): Promise<Member[]> {
    try {
      return await MemberModel.fetchMembers();
    } catch (error) {
      console.error('Error in MemberController.getAllMembers:', error);
      throw error;
    }
  }

  static validateMemberData(data: any): boolean {
    return !!(data.name && data.email);
  }
}
