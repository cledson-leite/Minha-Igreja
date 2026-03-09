import { Member } from '../store/useMemberStore';

export class MemberModel {
  static async fetchMembers(): Promise<Member[]> {
    // In a real app, this would be a fetch call to an API
    // For now, we return the mock data handled by the store
    return [];
  }

  static async createMember(member: Omit<Member, 'id'>): Promise<Member> {
    return { ...member, id: Math.random().toString() };
  }
}
