import penguin from '../assets/penguin.png';
import { Member } from '../types';
import type { MemberListProps } from '../types';

function MemberList({ members }: MemberListProps) {
  return (
    <aside className='w-1/6 m-6 bg-white p-4 rounded-lg shadow'>
      <h2 className=''>Members</h2>
      <ul>
        {
          members.map((member: Member) =>
            <li key={member.id} className='pt-2 pb-2 flex'>
              <img src={member.avatar ? member.avatar : penguin} alt={member.username} className='w-6 h-6 rounded-full' />
              <p className='ml-3'>{member.username}</p>
            </li>)
        }
      </ul>
    </aside>
  )
}

export default MemberList