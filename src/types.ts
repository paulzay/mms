export interface Member {
  id: number;
  username: string;
  avatar: string;
  email: string;
}

export interface MemberListProps {
  members: Member[];
}