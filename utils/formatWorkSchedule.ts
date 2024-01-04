export default function formatWorkSchedule(workSchedule: string) {
  switch (workSchedule) {
    case 'FULLTIME':
      return 'Full-Time';
    case 'PARTTIME':
      return 'Part-Time';
    case 'INTERNSHIP':
      return 'Internship';
    default:
      return 'Error';
  }
}
