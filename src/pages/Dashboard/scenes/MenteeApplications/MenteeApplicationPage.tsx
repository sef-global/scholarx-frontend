import { useParams, Link } from 'react-router-dom';
import MenteeApplication from '../../../../components/MenteeApplication/MenteeApplication.component';
import ChevronRightIcon from '../../../../assets/svg/Icons/ChevronRightIcon';
import useMentee from '../../../../hooks/admin/useMentee';

const MenteeApplicationPage = () => {
  const { menteeId } = useParams();
  const { data: mentee } = useMentee(menteeId);

  return (
    <div className="p-8 max-w-4xl">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>Dashboard</li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <Link
              to="/dashboard/mentee-applications"
              className="block transition hover:text-gray-700"
            >
              Manage Mentee Applications
            </Link>
          </li>
          <li>
            <ChevronRightIcon />
          </li>
          <li>
            <span className="block transition">
              {mentee?.application.firstName} {mentee?.application.lastName}
            </span>
          </li>
        </ol>
      </nav>
      <div className="mt-10 flex justify-center">
        <MenteeApplication />
      </div>
    </div>
  );
};

export default MenteeApplicationPage;
